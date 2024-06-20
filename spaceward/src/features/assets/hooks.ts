import { useQueryHooks } from "@/hooks/useClient";
import { AddressType } from "@wardenprotocol/wardenjs/codegen/warden/warden/v1beta2/key";
import { balancesQuery } from "./queries";
import { useQueries } from "@tanstack/react-query";

export const useAssetQueries = (spaceId?: string | null) => {
	const { isReady, useKeysBySpaceId } = useQueryHooks();

	const queryKeys = useKeysBySpaceId({
		request: {
			spaceId: spaceId ? BigInt(spaceId) : BigInt(0),
			deriveAddresses: [
				AddressType.ADDRESS_TYPE_ETHEREUM,
				AddressType.ADDRESS_TYPE_OSMOSIS,
			],
		},
		options: {
			enabled: isReady && Boolean(spaceId),
		},
	});

	const queryBalances = useQueries(balancesQuery(queryKeys.data?.keys));

	return { queryKeys, queryBalances };
};
