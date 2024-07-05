import { useSpaceId } from "@/hooks/useSpaceId";
import { useCurrency } from "@/hooks/useCurrency";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useMemo, useState } from "react";
import clsx from "clsx";
import DepositFinalModal from "@/features/assets/DepositFinalModal";
import { Icons } from "@/components/ui/icons-assets";
import { useAssetQueries } from "@/features/assets/hooks";
import { NewKeyButton } from "@/features/keys";
import { AddressType } from "@wardenprotocol/wardenjs/codegen/warden/warden/v1beta3/key";
import { bigintToFixed, bigintToFloat } from "@/lib/math";
import { useModalContext } from "@/context/modalContext";
import { FIAT_FORMAT } from "@/features/assets/util";
import {
	NetworkIcons,
	NetworkIconsTransparent,
	TokenIcons,
} from "@/components/ui/icons-crypto";
import { AssetPlaceholder } from "@/features/assets/AssetRow";

function capitalize<T extends string>(str: T): Capitalize<T> {
	return (str.charAt(0).toUpperCase() +
		str.slice(1).toLowerCase()) as Capitalize<T>;
}

type Currency = keyof typeof FIAT_FORMAT;

export function AssetsPage() {
	const curr = useCurrency();
	const currency = curr.currency as Currency;
	const setCurrency = curr.setCurrency as (currency: Currency) => void;
	const formatter = FIAT_FORMAT[currency];
	const { dispatch: modalDispatch } = useModalContext();
	const { spaceId } = useSpaceId();
	const { queryKeys, queryBalances, queryPrices } = useAssetQueries(spaceId);

	const _results = queryBalances
		.filter((q) => Boolean(q.data?.results.length))
		.flatMap(({ data }) =>
			data!.results.map((result) => ({ ...result, key: data?.key })),
		);

	const results = _results.filter((item) => Boolean(item.balance));

	const fiatConversion = useMemo(() => {
		if (currency === "usd") {
			return {
				name: "usd",
				value: BigInt(1),
				decimals: 0,
			};
		}

		for (const entry of queryPrices) {
			if (!entry.data) {
				continue;
			}

			if (entry.data.name === currency) {
				return entry.data;
			}
		}
	}, [queryPrices, currency]);

	const [graphInterval, setGraphInterval] = useState<7 | 30 | 90>(30);
	const [isAllKeysVisible, setAllKeysVisible] = useState(false);
	const [isAllNetworksVisible, setAllNetworksVisible] = useState(false);
	const [isDopositFinalModal, setIsDepositFinalModal] = useState(false);

	const { chains, totalBalance } = useMemo(() => {
		const targetDecimals = 2;
		const chains = new Set<string>();

		const totalBalance = results.reduce((acc, item) => {
			const decimals = item.decimals + item.priceDecimals;
			chains.add(item.chainName);

			const usd =
				(item.balance * item.price) /
				BigInt(10) ** BigInt(decimals - targetDecimals);

			return acc + usd;
		}, BigInt(0));

		return { chains: Array.from(chains), totalBalance };
	}, [results]);

	const noAssets = !totalBalance;

	const addresses = useMemo(() => {
		return queryKeys.data?.keys.flatMap((key) =>
			key.addresses.map((v) => {
				const keyId = key.key.id;
				return { ...v, keyId };
			}),
		);
	}, [queryKeys.data?.keys]);

	const noKeys = !queryKeys.data?.keys.length;

	if (noKeys) {
		return (
			<div className="h-[calc(100vh_-_106px)] min-h-[550px] flex flex-col justify-center items-center text-center">
				<Icons.noAssetsKey className="mb-[72px]" />

				<div className="text-5xl font-bold">No Keys found</div>

				<div className="h-6" />

				<div className="">
					First add a key to start receiving assets
				</div>

				<div className="h-12" />

				<NewKeyButton />
			</div>
		);
	}

	return (
		<div className="flex flex-col flex-1 h-full px-8 py-4 space-y-8">
			<div className="flex items-center justify-between pb-4 space-y-2">
				<div>
					<h2 className="text-5xl font-bold">Assets</h2>
					<p className="text-muted-foreground"></p>
				</div>
			</div>

			<div className="grid grid-cols-[320px_1fr] gap-[24px]">
				<div className="bg-card -bg relative overflow-hidden flex flex-col justify-between isolate py-6 px-8 rounded-xl">
					<img
						src="/images/asset-decor.png"
						alt=""
						className="absolute right-0 top-0 h-full w-auto z-[-5]"
					/>
					<div className="flex items-baseline gap-[6px]">
						<div className="text-2xl font-bold">
							{formatter.format(
								bigintToFloat(
									fiatConversion
										? (totalBalance *
												BigInt(10) **
													BigInt(
														fiatConversion.decimals,
													)) /
												fiatConversion.value
										: BigInt(0),
									2,
								),
							)}
						</div>

						{!noAssets ? (
							<Select
								value={currency}
								onValueChange={setCurrency}
							>
								<SelectTrigger className="flex gap-[4px] w-fit bg-[transparent] border-0 outline-none focus:!otline-none shadow-none focus:!shadow-none p-0 !shadow-transparent text-sm text-muted-foreground h-auto">
									<SelectValue
										placeholder="Currency"
										className=""
									/>
								</SelectTrigger>
								<SelectContent>
									<SelectGroup>
										<SelectItem value="usd">USD</SelectItem>
										<SelectItem value="eur">EUR</SelectItem>
										<SelectItem value="gbp">GBP</SelectItem>
									</SelectGroup>
								</SelectContent>
							</Select>
						) : null}
					</div>

					<div className="grid grid-cols-2 gap-2">
						<button
							className="w-full text-black bg-white flex items-center h-10 rounded gap-2 justify-center text-base font-medium"
							onClick={modalDispatch.bind(null, {
								type: "set",
								payload: {
									type: "select-key",
									params: { next: "receive", addresses },
								},
							})}
						>
							<Icons.arrowDown />
							Receive
						</button>
						{!noAssets ? (
							<button
								onClick={() => {
									const item = results[0] ?? _results[0];

									modalDispatch({
										type: "set",
										payload: {
											type: "send",
											params: {
												chainName: item.chainName,
												keyResponse: item.key,
												token: item.token,
												type: item.type.startsWith(
													"eip155:",
												)
													? AddressType.ADDRESS_TYPE_ETHEREUM
													: AddressType.ADDRESS_TYPE_OSMOSIS,
											},
										},
									});
								}}
								className="w-full text-muted-foreground flex items-center h-10 rounded gap-2 justify-center text-base font-medium"
							>
								<Icons.send />
								Send
							</button>
						) : null}
					</div>
				</div>
				<div className="bg-card  rounded-xl min-h-[220px] border-border-secondary border-[1px] py-6 px-8">
					<div className="flex justify-between items-center">
						<div className="text-2xl font-bold tracking-[0.12px]">
							Performance
						</div>
						<div className="flex gap-2">
							<div
								onClick={() => setGraphInterval(7)}
								className={clsx(
									"text-xs text-pixel-pink py-1 px-2 rounded-3xl cursor-pointer ease-out duration-200",
									graphInterval == 7 &&
										"bg-pink-secondary pointer-events-none",
								)}
							>
								7D
							</div>
							<div
								onClick={() => setGraphInterval(30)}
								className={clsx(
									"text-xs text-pixel-pink py-1 px-2 rounded-3xl cursor-pointer ease-out duration-200",
									graphInterval == 30 &&
										"bg-pink-secondary pointer-events-none",
								)}
							>
								1M
							</div>
							<div
								onClick={() => setGraphInterval(90)}
								className={clsx(
									"text-xs text-pixel-pink py-1 px-2 rounded-3xl cursor-pointer ease-out duration-200",
									graphInterval == 90 &&
										"bg-pink-secondary pointer-events-none",
								)}
							>
								3M
							</div>
						</div>
					</div>

					<img
						src="/images/graph.png"
						alt=""
						className="h-[107px] object-contain"
					/>
				</div>
			</div>

			<div className="bg-card  rounded-xl border-border-secondary border-[1px] px-8 py-6">
				{noAssets ? (
					<div className="min-h-[280px] flex flex-col items-center justify-center text-center">
						<div className="text-2xl font-bold tracking-[0.12px] mb-1">
							No Assets yet
						</div>
						<div className="text-muted-foreground">
							Deposit assets to SpaceWard
						</div>
						<button
							className="text-black mt-6 bg-white h-[40px] rounded-lg justify-center text-base font-medium py-1 px-5 duration-300 ease-out hover:bg-pixel-pink"
							onClick={modalDispatch.bind(null, {
								type: "set",
								payload: {
									type: "select-key",
									params: { next: "receive", addresses },
								},
							})}
						>
							Receive
						</button>
					</div>
				) : (
					<div>
						<div className="flex justify-between items-center">
							<div className="text-2xl font-bold tracking-[0.12px]">
								Balances
							</div>

							<div className="flex gap-2">
								<div className="gap-2">
									<div
										onClick={() =>
											setAllKeysVisible(!isAllKeysVisible)
										}
										className="cursor-pointer group relative h-8 rounded-2xl bg-secondary-bg py-2 px-3 text-xs text-white flex items-center gap-[2px]"
									>
										All Keys
										<Icons.chevronDown
											className={
												isAllKeysVisible
													? "rotate-180"
													: ""
											}
										/>
										{isAllKeysVisible && (
											<div className="w-[248px] bg-secondary-bg text-white text-sm rounded-lg  py-2 absolute z-10 bottom-[-8px] right-0 whitespace-nowrap backdrop-blur-[30px] translate-y-[100%] ">
												<div className="cursor-pointer h-10 px-4 flex items-center gap-3">
													<img
														src="/images/key.png"
														className="w-6 h-6 object-contain cursor-pointer"
														alt=""
													/>
													All Keys
													<Icons.check className="ml-auto" />
												</div>
												{queryKeys.data?.keys.map(
													(key) => (
														<div
															className="cursor-pointer h-10 px-4 flex items-center gap-3"
															key={key.key.id}
														>
															<img
																src="/images/somewallet.png"
																className="w-6 h-6 object-contain cursor-pointer"
																alt=""
															/>
															Key #
															{key.key.id.toString()}
														</div>
													),
												)}
											</div>
										)}
									</div>
								</div>

								<div className="gap-2">
									<div
										onClick={() =>
											setAllNetworksVisible(
												!isAllNetworksVisible,
											)
										}
										className="cursor-pointer group relative h-8 rounded-2xl bg-secondary-bg py-2 px-3 text-xs text-white flex items-center gap-[2px]"
									>
										All Networks
										<Icons.chevronDown
											className={
												isAllNetworksVisible
													? "rotate-180"
													: ""
											}
										/>
										{isAllNetworksVisible && (
											<div className="w-[248px] bg-secondary-bg text-white text-sm rounded-lg  py-2 absolute z-10 bottom-[-8px] right-0 whitespace-nowrap backdrop-blur-[30px] translate-y-[100%] ">
												<div className="cursor-pointer h-10 px-4 flex items-center gap-3">
													<img
														src="/images/networks.png"
														className="w-6 h-6 object-contain cursor-pointer"
														alt=""
													/>
													All Networks
													<Icons.check className="ml-auto" />
												</div>
												{chains.map((chainName) => {
													const Network =
														NetworkIcons[
															chainName
														] ?? AssetPlaceholder;
													return (
														<div
															className="cursor-pointer h-10 px-4 flex items-center gap-3"
															key={chainName}
														>
															<Network className="w-6 h-6 object-contain cursor-pointer" />
															{chainName}
														</div>
													);
												})}
											</div>
										)}
									</div>
								</div>
							</div>
						</div>

						<div className="h-4" />

						{results.map(({ key, ...item }) => {
							const Network =
								NetworkIconsTransparent[item.chainName] ??
								AssetPlaceholder;

							const Token =
								TokenIcons[item.token] ?? AssetPlaceholder;

							return (
								<div
									className="grid grid-cols-[1fr_100px_100px_280px] h-[72px]"
									key={`${item.token}:${item.chainName}:${item.address}`}
								>
									<div className="flex items-center gap-3">
										<div className="relative">
											<Token className="w-10 h-10 object-contain" />
											<Network className="w-[18px] h-[18px] object-contain absolute right-[-4px] bottom-[-4px]" />
										</div>
										<div>
											<div>{item.token}</div>
											<div className="text-xs text-muted-foreground">
												{item.title} (
												{capitalize(item.chainName)})
											</div>
										</div>
									</div>

									<div className="text-right flex flex-col justify-center">
										<div>
											...
											{item.address.slice(-8)}
										</div>
										<div className="text-xs text-muted-foreground">
											Key #{key?.key.id.toString()}
										</div>
									</div>

									<div className="text-right flex flex-col justify-center">
										<div>
											{bigintToFixed(item.balance, {
												decimals: item.decimals,

												display: 4,
												format: true,
											})}
										</div>
										<div className="text-xs text-muted-foreground">
											{formatter.format(
												bigintToFloat(
													fiatConversion
														? (item.balance *
																item.price *
																BigInt(10) **
																	BigInt(
																		fiatConversion.decimals,
																	)) /
																fiatConversion.value
														: BigInt(0),
													item.decimals +
														item.priceDecimals,
												),
											)}
										</div>
									</div>

									<div className="flex items-center justify-end gap-2">
										<button
											className=" text-white bg-secondary-bg h-8 rounded justify-center font-medium py-1 px-4"
											onClick={modalDispatch.bind(null, {
												type: "set",
												payload: {
													type: "receive",
													params: {
														address: item.address,
														chainName:
															item.chainName,
														token: item.token,
														type: item.type.startsWith(
															"eip155:",
														)
															? AddressType.ADDRESS_TYPE_ETHEREUM
															: AddressType.ADDRESS_TYPE_OSMOSIS,
													},
												},
											})}
										>
											Receive
										</button>
										<button
											className=" text-white bg-secondary-bg h-8 rounded justify-center font-medium py-1 px-4"
											onClick={modalDispatch.bind(null, {
												type: "set",
												payload: {
													type: "send",
													params: {
														address: item.address,
														chainName:
															item.chainName,
														keyResponse: key,
														token: item.token,
														type: item.type.startsWith(
															"eip155:",
														)
															? AddressType.ADDRESS_TYPE_ETHEREUM
															: AddressType.ADDRESS_TYPE_OSMOSIS,
													},
												},
											})}
										>
											Send
										</button>
									</div>
								</div>
							);
						})}
					</div>
				)}
			</div>

			{isDopositFinalModal && (
				<DepositFinalModal
					onHide={() => setIsDepositFinalModal(false)}
				/>
			)}
		</div>
	);
}
