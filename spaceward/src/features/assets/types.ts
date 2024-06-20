export interface BalanceEntry {
	balance: bigint;
	chainId: string;
	chainName: string;
	decimals: number;
	erc20Token?: `0x${string}`;
	type: "eip155:native" | "eip155:erc20";
}
