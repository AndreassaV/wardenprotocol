import { Icons } from "@/components/ui/icons-assets";
import AssetTransactionModal from "@/features/assets/AssetTransactionModal.tsx";
import SelectKeyModal from "@/features/assets/SelectKeyModal";
import clsx from "clsx";
import { useState } from "react";
import { NewKeyButton } from "@/features/keys";
import { useSpaceId } from "@/hooks/useSpaceId";
import Keys from "@/features/dashboard/Keys";
import { useIntents } from "./Intents";
import Intent from "@/features/dashboard/Intent";

export function DashboardPage() {
	const { spaceId } = useSpaceId();

	const [graphInterval, setGraphInterval] = useState<7 | 30 | 90>(30);
	const [isSelectKeyModal, setIsSelectKeyModal] = useState(false);

	const [isEmpty, setIsEmpty] = useState(false);

	const [hasOwners, setHasOwners] = useState(true);

	const [hasVotes, setHasVotes] = useState(false);

	const [isShowTransactionModal, setIsShowTransactionModal] = useState({
		isShown: false,
		type: "deposit",
	});

	const { activeIntentId } = useIntents();

	return (
		<div className="px-8 py-4">
			<h2 className="text-5xl mb-10 font-bold">Dashboard</h2>

			<div className="grid gap-6 grid-cols-[2fr_1fr]">
				{isEmpty ? (
					<div className="relative isolate flex flex-col items-center justify-center text-center bg-tertiary border-[1px] border-border-secondary rounded-2xl">
						<img
							className="absolute left-0 top-0 z-[-1] w-full h-full object-cover"
							src="/images/nokeys.png"
							alt=""
						/>
						<div className="font-bold text-2xl">No Keys found</div>
						<div className="text-secondary-text">
							First add a key to start receiving assets
						</div>

						<NewKeyButton />
					</div>
				) : (
					<div className="relative group cursor-pointer bg-tertiary p-6 pb-0 border-[1px] border-border-secondary rounded-2xl">
						<div className="flex items-start justify-between mb-1">
							<div className="font-bold text-[32px] flex items-center gap-3">
								$4,085.76
								<Icons.buttonArrow className="group-hover:opacity-100 opacity-0 ease-out duration-300" />
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

						<div className="text-secondary-text">In total</div>

						<img
							className="-mx-6 w-[calc(100%_+_48px)] max-w-none"
							src="/images/dashboard-graph.png"
							alt=""
						/>

						<div className="absolute left-6 bottom-6 flex w-[calc(100%_-_48px)] justify-between">
							<div className="flex items-center gap-3">
								<div className="flex">
									<img
										className="w-10 h-10 object-contain"
										src="/images/eth.png"
										alt=""
									/>

									<img
										className="w-10 h-10 object-contain -ml-3"
										src="/images/arb-icon.png"
										alt=""
									/>

									<img
										className="w-10 h-10 object-contain -ml-3"
										src="/images/polygon.png"
										alt=""
									/>
								</div>
								5 assets
							</div>
							<button
								onClick={() => setIsSelectKeyModal(true)}
								className="rounded h-10 px-5 font-semibold bg-secondary-bg duration-300 ease-out hover:bg-pink-secondary"
							>
								Receive
							</button>
						</div>
					</div>
				)}

				<div className="bg-tertiary py-6 px-8 border-[1px] border-border-secondary rounded-2xl">
					<div className="font-bold text-[32px] text-center mb-4">
						#{spaceId} Space
					</div>

					{isEmpty || !spaceId ? (
						<></>
					) : (
						<div className="flex gap-2 justify-center">
							{/* {KEYS.map((item, key) => (
								<div
									key={key}
									onClick={() => setIsSelectKeyModal(true)}
									className="cursor-pointer mb-8 max-h-8 relative p-1 min-w-12 border-[1px] border-border-secondary rounded overflow-hidden isolate"
								>
									<img
										className="absolute left-0 top-[50%] translate-y-[-50%] w-full h-full object-cover z-[-2]"
										src="/images/key-bg.jpg"
										alt=""
									/>
									<div className="z-[-1] absolute left-0 top-0 w-full h-full bg-overlay-secondary" />
									<Icons.key className="w-3 h-3" />
									<div className="text-[10px] text-right">
										...{item.slice(-4)}
									</div>
								</div>
							))} */}

							<Keys spaceId={spaceId} />

							<div
								onClick={() => setIsSelectKeyModal(true)}
								className="cursor-pointer max-h-8 bg-secondary-bg flex items-center justify-center min-w-12 border-[1px] border-border-secondary rounded"
							>
								<Icons.plus className="w-4 h-4" />
							</div>
						</div>
					)}

					<div className="mb-[22px] h-[1px] bg-secondary-bg" />

					<a
						href="/intents"
						className="py-[10px] flex justify-between items-center gap-3 cursor-pointer"
					>
						<div className="flex gap-3 items-center">
							<Icons.activeIntent />
							Active Intent
						</div>

						{activeIntentId ? (
							<Intent activeIntentId={activeIntentId} />
						) : (
							<div className="text-pixel-pink flex items-center">
								Add
								<Icons.chevronPink />
							</div>
						)}
					</a>
					<a
						href="/owners"
						className="py-[10px]  flex justify-between items-center gap-3 cursor-pointer"
					>
						<div className="flex gap-3 items-center">
							<Icons.group />
							Owners
						</div>

						{hasOwners ? (
							<div className="text-secondary-text flex items-center">
								4
								<Icons.chevronSecondary />
							</div>
						) : (
							<div className="text-secondary-text flex items-center">
								You
								<Icons.chevronSecondary />
							</div>
						)}
					</a>
				</div>
			</div>

			<div className="my-6 h-[1px] bg-secondary-bg" />

			<div className="grid gap-6 grid-cols-[2fr_1fr] mb-5">
				{isEmpty ? (
					<div className="bg-tertiary border-[1px] flex-col gap-5 border-border-secondary rounded-2xl flex items-center justify-center text-center">
						<Icons.arrowLeftRight />
						<div className="text-xl	font-bold">No actions yet</div>
					</div>
				) : (
					<div>
						<div className="grid grid-cols-2 gap-6">
							<a
								href="/governance"
								className="cursor-pointer group bg-pink-secondary border-[1px] border-border-secondary overflow-hidden rounded-2xl py-5 px-6 relative isolate"
							>
								<img
									src="/images/dashboard-governance.png"
									className="absolute right-0 bottom-0 h-full object-contain z-[-1]"
									alt=""
								/>
								<div className="font-bold text-2xl mb-4 flex items-center justify-between">
									Governance
									{hasVotes ? (
										<div className="group-hover:opacity-100 opacity-0 ease-in duration-300 rounded-full w-8 h-8 flex items-center justify-center bg-secondary-bg">
											<Icons.chevronDown className="-rotate-90 w-6 h-6" />
										</div>
									) : (
										<></>
									)}
								</div>
								{hasVotes ? (
									<div className="flex gap-3 items-center">
										<div className="rounded-full w-10 h-10 flex items-center justify-center text-pixel-pink text-xl	bg-pink-secondary">
											3
										</div>
										Active votes
									</div>
								) : (
									<button className="rounded h-10 px-5 font-semibold bg-secondary-bg duration-300 ease-out hover:bg-pink-secondary">
										Vote
									</button>
								)}
							</a>

							<a
								href="/staking"
								className="cursor-pointer group bg-staking-bg border-[1px] border-border-secondary overflow-hidden rounded-2xl py-5 px-6 relative isolate"
							>
								<img
									src="/images/staking-bg.png"
									className="absolute right-0 bottom-0 h-full object-contain z-[-1]"
									alt=""
								/>
								<div className="font-bold text-2xl mb-4 flex items-center justify-between">
									Staking
									<div className="group-hover:opacity-100 opacity-0 ease-in duration-300 rounded-full w-8 h-8 flex items-center justify-center bg-secondary-bg">
										<Icons.chevronDown className="-rotate-90 w-6 h-6" />
									</div>
								</div>
								<div className="flex justify-between items-center">
									<div className="flex gap-3 items-center">
										<Icons.wardPink className="w-10 h-10" />
										10,350,456.01
									</div>
									<div className="text-pixel-pink">
										+2,345.11
									</div>
								</div>
							</a>
						</div>

						<div className="bg-tertiary py-5 px-6 mt-6 border-[1px] border-border-secondary rounded-2xl">
							<div className="flex justify-between items-center gap-2 mb-3">
								<div className="font-bold text-2xl flex items-center justify-between">
									Last actions
								</div>
								<a
									href="/actions"
									className="font-semibold text-secondary-text"
								>
									See All
								</a>
							</div>

							<div className="mb-5 text-label-tertiary text-sm">
								4 June &apos;24
							</div>

							<div className="grid gap-x-10 gap-y-5 grid-cols-[1.5fr_1fr_0.6fr_0.7fr]">
								<div>#3054 Update Space</div>
								<div>Intent 1</div>
								<div>12:07 PM</div>
								<div className="flex justify-end">
									<div className="w-fit flex items-center p-1 pr-2 gap-1 text-secondary-text border-[1px] border-secondary-text text-xs rounded">
										<Icons.grayCheckmark />
										Completed
									</div>
								</div>

								<div>#3054 Update Space</div>
								<div>Intent 1</div>
								<div>12:07 PM</div>
								<div className="flex justify-end">
									<div className="w-fit flex items-center p-1 pr-2 gap-1 text-secondary-text border-[1px] border-secondary-text text-xs rounded">
										<Icons.grayCheckmark />
										Completed
									</div>
								</div>

								<div>#3054 Update Space</div>
								<div>Intent 1</div>
								<div>12:07 PM</div>
								<div className="flex justify-end">
									<div className="w-fit flex items-center p-1 pr-2 gap-1 text-secondary-text border-[1px] border-secondary-text text-xs rounded">
										<Icons.grayCheckmark />
										Completed
									</div>
								</div>

								<div>#3054 Update Space</div>
								<div>Intent 1</div>
								<div>12:07 PM</div>
								<div className="flex justify-end">
									<div className="w-fit flex items-center p-1 pr-2 gap-1 text-secondary-text border-[1px] border-secondary-text text-xs rounded">
										<Icons.grayCheckmark />
										Completed
									</div>
								</div>
							</div>
						</div>
					</div>
				)}

				<div>
					<div className="py-5 px-6 border-[1px] border-secondary-bg rounded-2xl">
						<div className="flex justify-between items-center gap-2 mb-3">
							<div className="font-bold text-2xl flex items-center justify-between">
								Top dApps
							</div>
							<a
								href="/apps"
								className="font-semibold text-secondary-text"
							>
								See All
							</a>
						</div>

						<div className="flex items-center rounded-lg p-3 ease-out duration-300 gap-3 hover:bg-secondary-bg cursor-pointer">
							<img
								className="w-10 h-10 object-cover overflow-hidden rounded-[10px]"
								src="/images/uniswap.jpg"
								alt=""
							/>
							<div>
								<div>Uniswap</div>
								<div className="text-xs text-secondary-text">
									The most popular DEX
								</div>
							</div>
						</div>

						<div className="flex items-center rounded-lg p-3 ease-out duration-300 gap-3 hover:bg-secondary-bg cursor-pointer">
							<img
								className="w-10 h-10 object-cover overflow-hidden rounded-[10px]"
								src="/images/squid.jpg"
								alt=""
							/>
							<div>
								<div>Squid</div>
								<div className="text-xs text-secondary-text">
									Cross-chain DEX
								</div>
							</div>
						</div>

						<div className="flex items-center rounded-lg p-3 ease-out duration-300 gap-3 hover:bg-secondary-bg cursor-pointer">
							<img
								className="w-10 h-10 object-cover overflow-hidden rounded-[10px]"
								src="/images/osmosis.png"
								alt=""
							/>
							<div>
								<div>Osmosis</div>
								<div className="text-xs text-secondary-text">
									The premier DEX
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			{isSelectKeyModal && (
				<SelectKeyModal
					onHide={() => setIsSelectKeyModal(false)}
					showTransactionModal={(type) => {
						setIsShowTransactionModal({
							isShown: true,
							type: type,
						});
					}}
				/>
			)}

			{isShowTransactionModal.isShown && (
				<AssetTransactionModal
					onHide={() =>
						setIsShowTransactionModal({
							isShown: false,
							type: "send",
						})
					}
					onHideAll={() => {
						setIsShowTransactionModal({
							isShown: false,
							type: "send",
						});
						setIsSelectKeyModal(false);
					}}
					type={isShowTransactionModal.type}
				/>
			)}
		</div>
	);
}
