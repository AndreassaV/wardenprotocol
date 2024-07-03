package main

import (
	"context"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"os/exec"
	"reflect"
	"strconv"
	"strings"
	"sync"
	"time"

	"github.com/cosmos/cosmos-sdk/types/bech32"
	"github.com/rs/zerolog"

	"github.com/warden-protocol/wardenprotocol/cmd/faucet/pkg/config"
)

type Out struct {
	Stdout []byte
	Stderr []byte
}

type Faucet struct {
	log             zerolog.Logger
	config          config.Config
	Cooldown        time.Duration
	DailySupply     float64
	TokensAvailable float64
	Amount          float64
	Batch           []string
	BatchInterval   time.Duration
	LatestTXHash    string
	*sync.Mutex
}

const (
	mutexLocked     = 1
	workers         = 2
	uwardConversion = 1000000
)

func execute(cmdString string) (Out, error) {
	// Create the command
	cmd := exec.Command("sh", "-c", cmdString)

	// Get the output pipes
	stdout, err := cmd.StdoutPipe()
	if err != nil {
		return Out{}, fmt.Errorf("error getting stdout pipe: %w", err)
	}
	stderr, err := cmd.StderrPipe()
	if err != nil {
		return Out{}, fmt.Errorf("error getting stderr pipe: %w", err)
	}

	// Start the command
	if err = cmd.Start(); err != nil {
		return Out{}, fmt.Errorf("error starting command: %w", err)
	}

	// Read the output
	var output, errOutput []byte
	var stdoutErr, stderrErr error

	var wg sync.WaitGroup
	wg.Add(workers)

	go func() {
		defer wg.Done()
		output, stdoutErr = io.ReadAll(stdout)
	}()

	go func() {
		defer wg.Done()
		errOutput, stderrErr = io.ReadAll(stderr)
	}()

	wg.Wait()

	if stdoutErr != nil {
		return Out{}, fmt.Errorf("error reading stdout: %w", stdoutErr)
	}
	if stderrErr != nil {
		return Out{}, fmt.Errorf("error reading stderr: %w", stderrErr)
	}

	// Wait for the command to finish
	err = cmd.Wait()
	if err != nil {
		// Include stderr in the error message if available
		if len(errOutput) > 0 {
			return Out{}, fmt.Errorf("command failed: %w\nStderr: %s", err, string(errOutput))
		}
		return Out{}, fmt.Errorf("command failed: %w", err)
	}

	return Out{Stdout: output, Stderr: errOutput}, nil
}

func (f *Faucet) setupNewAccount() error {
	cmd := strings.Join([]string{
		"echo",
		f.config.Mnemonic,
		"|",
		f.config.CliName,
		"keys",
		"--keyring-backend",
		"test",
		"add",
		f.config.AccountName,
		"--recover",
	}, " ")

	_, err := execute(cmd)
	if err != nil {
		return err
	}
	return nil
}

func validAddress(addr string) error {
	pref, _, err := bech32.DecodeAndConvert(addr)
	if err != nil {
		return fmt.Errorf("invalid address: %w", err)
	}
	if pref != "warden" {
		return fmt.Errorf("invalid address prefix: %s", pref)
	}
	return nil
}

func InitFaucet(logger zerolog.Logger) (Faucet, error) {
	var err error
	cfg, err := config.LoadConfig()
	if err != nil {
		panic(err)
	}

	totalSupply, err := strconv.Atoi(cfg.DailyLimit)
	if err != nil {
		return Faucet{}, err
	}
	amount, err := strconv.Atoi(cfg.Amount)
	if err != nil {
		return Faucet{}, err
	}

	f := Faucet{
		config:          cfg,
		Mutex:           &sync.Mutex{},
		Batch:           []string{},
		log:             logger,
		TokensAvailable: float64(totalSupply) / uwardConversion,
		DailySupply:     float64(totalSupply) / uwardConversion,
		Amount:          float64(amount),
	}

	f.Cooldown, err = time.ParseDuration(f.config.CoolDown)
	if err != nil {
		return Faucet{}, err
	}

	f.BatchInterval, err = time.ParseDuration(f.config.BatchInterval)
	if err != nil {
		return Faucet{}, err
	}

	if f.config.Mnemonic != "" {
		if err = f.setupNewAccount(); err != nil {
			return Faucet{}, err
		}
	}

	return f, nil
}

func MutexLocked(m *sync.Mutex) bool {
	state := reflect.ValueOf(m).Elem().FieldByName("state")
	return state.Int()&mutexLocked == mutexLocked
}

func (f *Faucet) batchProcessInterval(ctx context.Context) {
	ticker := time.NewTicker(f.BatchInterval)
	for {
		select {
		case <-ctx.Done():
			return
		case <-ticker.C:
			if len(f.Batch) > 0 && !MutexLocked(f.Mutex) {
				if txHash, _, err := f.Send("", true); err != nil {
					f.log.Error().Msgf("error sending batch: %s", err)
				} else {
					f.log.Info().Msgf("tx hash %s", txHash)
					f.LatestTXHash = txHash
				}
			}
		}
	}
}

func (f *Faucet) Send(addr string, force bool) (string, int, error) {
	f.Lock()
	defer f.Unlock()

	if len(f.Batch) < f.config.BatchLimit && !force {
		if err := validAddress(addr); err != nil {
			return "", http.StatusUnprocessableEntity, err
		}
		f.Batch = append(f.Batch, addr)
		return "", 0, nil
	}

	send := "send"
	if len(f.Batch) > 1 {
		send = "multi-send"
	}

	f.log.Info().Msgf("sending %s%s to %v", f.config.Amount, f.config.Denom, f.Batch)

	amount := f.config.Amount + f.config.Denom

	cmd := strings.Join([]string{
		f.config.CliName,
		"tx",
		"bank",
		send,
		f.config.AccountName,
		strings.Join(f.Batch, " "),
		amount,
		"--yes",
		"--keyring-backend",
		"test",
		"--chain-id",
		f.config.ChainID,
		"--node",
		f.config.Node,
		"--gas-prices",
		f.config.Fees,
		"-o",
		"json",
	}, " ")

	out, err := execute(cmd)
	if err != nil {
		return "", http.StatusInternalServerError, err
	}

	var result struct {
		Code   int    `json:"code"`
		TxHash string `json:"txhash"`
	}

	if err = json.Unmarshal(out.Stdout, &result); err != nil {
		return "", http.StatusInternalServerError, fmt.Errorf("error unmarshalling tx result: %w", err)
	}

	if result.Code != 0 {
		return "", http.StatusInternalServerError, fmt.Errorf(
			"tx failed with code %d for address %s",
			result.Code,
			addr,
		)
	}

	f.TokensAvailable = (f.TokensAvailable - float64(len(f.Batch))*f.Amount/uwardConversion)
	f.log.Info().Msgf("tokens available: %f", f.TokensAvailable)

	f.Batch = []string{}
	return result.TxHash, http.StatusOK, nil
}
