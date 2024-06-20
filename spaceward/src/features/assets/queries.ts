import { getProvider } from "@/lib/eth";
import { AddressType } from "@wardenprotocol/wardenjs/codegen/warden/warden/v1beta2/key";
import { QueryKeyResponse } from "@wardenprotocol/wardenjs/codegen/warden/warden/v1beta2/query";
import { BalanceEntry } from "./types";

type ChainName = Parameters<typeof getProvider>[0];

const eip155NativeBalanceQuery = (
	chainName: ChainName,
	address?: `0x${string}`,
) => ({
	queryKey: ["eip155", chainName, "native", address],
	queryFn: async (): Promise<BalanceEntry> => {
		if (!address) {
			throw new Error("Address is required");
		}

		const provider = getProvider(chainName);
		const balance = await provider.getBalance(address);
		const network = await provider.getNetwork();

		return {
			balance,
			chainId: network.chainId.toString(),
			chainName,
			decimals: 18,
			type: "eip155:native",
		};
	},
	enabled: Boolean(address),
});

const is0x = (address: string): address is `0x${string}` =>
	address.startsWith("0x");

export const balancesQuery = (keys?: QueryKeyResponse[]) => {
	const eth: `0x${string}`[] = [];

	for (const key of keys ?? []) {
		for (const address of key.addresses) {
			if (
				is0x(address.address) &&
				address.type === AddressType.ADDRESS_TYPE_ETHEREUM
			) {
				eth.push(address.address);
			}
		}
	}

	const queries = (["sepolia", "mainnet"] as const).flatMap((chainName) => {
		return eth.map((address) =>
			eip155NativeBalanceQuery(chainName, address),
		);
	});

	return { queries };
};
