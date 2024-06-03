import { useState } from "react";
import clsx from "clsx";
import SignTranactionModal from "@/features/assets/SignTransactionModal";
import { Icons } from "@/components/ui/icons-assets";
import StakeModal from "@/features/stake/StakeModal";
import Validators from "@/features/staking/Validators";

export function StakingPage() {
	const [activeTab, setActiveTab] = useState("validators");
	const [sortDropdown, setSortDropdown] = useState("");

	const [stakeModal, setStakeModal] = useState(false);

	const [isSignTransactionModal, setIsSignTransactionModal] = useState(false);

	return (
		<div className="flex flex-col flex-1 h-full px-8 py-4 space-y-8">
			<div className="flex items-center justify-between pb-4 space-y-2">
				<div>
					<h2 className="text-5xl font-bold">Staking</h2>
					<p className="text-muted-foreground"></p>
				</div>
			</div>

			<div className="grid grid-cols-4 gap-6">
				<div className="bg-tertiary border-border-secondary border-[1px] rounded-xl	px-6 py-6">
					<div className="text-secondary-text text-sm">
						Available WARD
					</div>
					<div className="h-3" />
					<div className="flex items-center gap-[6px] text-xl font-bold">
						<Icons.logoWhite />
						120,345.34
					</div>
				</div>
				<div className="bg-tertiary border-border-secondary border-[1px] rounded-xl	px-6 py-6">
					<div className="text-secondary-text text-sm">
						Staked WARD
					</div>
					<div className="h-3" />
					<div className="flex items-center gap-[6px] text-xl font-bold">
						10,350,456.01
					</div>
				</div>
				<div className="bg-tertiary border-border-secondary border-[1px] rounded-xl	px-6 py-6">
					<div className="text-secondary-text text-sm flex items-center gap-1">
						Unbonding Period
						<div className="group relative z-10">
							<Icons.info />
							<div
								className={clsx(
									`w-[220px] opacity-0 bg-[rgba(229,238,255,0.15)] text-white text-center text-xs rounded py-2 px-3 absolute z-10 group-hover:opacity-100 top-[-18px] left-1/2 pointer-events-none backdrop-blur-[20px] translate-x-[-50%] translate-y-[-100%] before:content-[''] before:absolute before:left-[50%] before:bottom-0  before:border-[rgba(229,238,255,0.15)] before:border-b-[8px]  before:border-l-[8px] before:border-t-[transparent]  before:border-r-[transparent] before:border-t-[8px]  before:border-r-[8px] before:w-0 before:h-0 before:rotate-[-45deg] before:translate-y-[50%] before:translate-x-[-50%]`,
								)}
							>
								Cooldown period during which the tokens are
								frozen before being unstaked and usable again
							</div>
						</div>
					</div>
					<div className="h-3" />
					<div className="flex items-center gap-[6px] text-xl font-bold">
						<Icons.clock />
						21 days
					</div>
				</div>
				<div className="bg-tertiary border-border-secondary border-[1px] rounded-xl	px-6 py-6">
					<div className="text-secondary-text text-sm">
						Rewards WARD
					</div>
					<div className="h-3" />
					<div className="flex items-center gap-[6px] text-xl font-bold">
						2,345.11
						<button className="ml-auto font-semibold text-pixel-pink text-base	">
							Claim
						</button>
					</div>
				</div>
			</div>

			<div className="bg-tertiary rounded-xl border-border-secondary border-[1px] px-8 py-6">
				<div className="flex justify-between items-center">
					<div className="flex items-center gap-3">
						<div
							className={clsx(
								"text-2xl font-bold tracking-[0.12px] cursor-pointer ease-in duration-200",
								activeTab !== "validators" &&
									"text-tertiary-text",
							)}
							onClick={() => setActiveTab("validators")}
						>
							Validators
						</div>

						<div
							className={clsx(
								"text-2xl font-bold tracking-[0.12px] cursor-pointer ease-in duration-200",
								activeTab !== "staking" && "text-tertiary-text",
							)}
							onClick={() => setActiveTab("staking")}
						>
							My staking
						</div>
					</div>

					<div className="flex gap-2">
						<div className="gap-2">
							<div className="group relative z-10 cursor-pointer h-8 rounded-2xl bg-tertiary-text py-2 px-3 text-xs text-white flex items-center gap-1 ">
								<Icons.infoWhite />
								APR 16.5%
								<div
									className={clsx(
										`w-[220px] opacity-0 bg-[rgba(229,238,255,0.15)] text-white text-center text-xs rounded py-2 px-3 absolute z-10 group-hover:opacity-100 top-[-18px] left-1/2 pointer-events-none backdrop-blur-[20px] translate-x-[-50%] translate-y-[-100%] before:content-[''] before:absolute before:left-[50%] before:bottom-0  before:border-[rgba(229,238,255,0.15)] before:border-b-[8px]  before:border-l-[8px] before:border-t-[transparent]  before:border-r-[transparent] before:border-t-[8px]  before:border-r-[8px] before:w-0 before:h-0 before:rotate-[-45deg] before:translate-y-[50%] before:translate-x-[-50%]`,
									)}
								>
									APR is estimated percentage of your staked
									tokens that you will earn, on top of your
									staked tokens. The validators commission
									will be subtracted from it
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className="h-4" />

				<div className="grid grid-cols-[1fr_150px_150px_150px_200px] gap-3 pb-2">
					<div className="text-sm	text-secondary-text">Name</div>
					<div
						onClick={() => {
							if (sortDropdown === "commision") {
								setSortDropdown("");
							} else {
								setSortDropdown("commision");
							}
						}}
						className="text-sm cursor-pointer w-fit	text-secondary-text flex items-center gap-1 group relative"
					>
						Commision
						<Icons.chevronsUpDown />
						{sortDropdown === "commision" ? (
							<div className="rounded-lg overflow-hidden	bg-[rgba(229,238,255,0.15)] backdrop-blur-[20px] absolute right-0 top-[28px] w-[240px]">
								<div className="cursor-pointer h-12 flex items-center px-[10px] gap-[22px] hover:bg-[rgba(229,238,255,0.3)] transition-all duration-300">
									<Icons.ascending />
									<div className="text-sm whitespace-nowrap">
										Sort ascending
									</div>
								</div>
								<div className="cursor-pointer h-12 flex items-center px-[10px] gap-[22px] hover:bg-[rgba(229,238,255,0.3)] transition-all duration-300">
									<Icons.ascending className="rotate-180" />

									<div className="text-sm whitespace-nowrap">
										Sort descending
									</div>
								</div>
							</div>
						) : (
							<div></div>
						)}
					</div>
					<div
						onClick={() => {
							if (sortDropdown === "voting") {
								setSortDropdown("");
							} else {
								setSortDropdown("voting");
							}
						}}
						className="text-sm cursor-pointer relative w-fit text-secondary-text flex items-center gap-1"
					>
						Voting power
						<Icons.chevronsUpDown />
						{sortDropdown === "voting" ? (
							<div className="rounded-lg overflow-hidden	bg-[rgba(229,238,255,0.15)] backdrop-blur-[20px] absolute right-0 top-[28px] w-[240px]">
								<div className="cursor-pointer h-12 flex items-center px-[10px] gap-[22px] hover:bg-[rgba(229,238,255,0.3)] transition-all duration-300">
									<Icons.ascending />
									<div className="text-sm whitespace-nowrap">
										Sort ascending
									</div>
								</div>
								<div className="cursor-pointer h-12 flex items-center px-[10px] gap-[22px] hover:bg-[rgba(229,238,255,0.3)] transition-all duration-300">
									<Icons.ascending className="rotate-180" />

									<div className="text-sm whitespace-nowrap">
										Sort descending
									</div>
								</div>
							</div>
						) : (
							<div></div>
						)}
					</div>
					<div
						onClick={() => {
							if (sortDropdown === "status") {
								setSortDropdown("");
							} else {
								setSortDropdown("status");
							}
						}}
						className="text-sm cursor-pointer relative w-fit	text-secondary-text flex items-center gap-1"
					>
						Status
						<Icons.chevronsUpDown />
						{sortDropdown === "status" ? (
							<div className="rounded-lg overflow-hidden	bg-[rgba(229,238,255,0.15)] backdrop-blur-[20px] absolute right-0 top-[28px] w-[240px]">
								<div className="cursor-pointer h-12 flex items-center px-[10px] gap-[22px] hover:bg-[rgba(229,238,255,0.3)] transition-all duration-300">
									<Icons.ascending />
									<div className="text-sm whitespace-nowrap">
										Sort ascending
									</div>
								</div>
								<div className="cursor-pointer h-12 flex items-center px-[10px] gap-[22px] hover:bg-[rgba(229,238,255,0.3)] transition-all duration-300">
									<Icons.ascending className="rotate-180" />

									<div className="text-sm whitespace-nowrap">
										Sort descending
									</div>
								</div>
							</div>
						) : (
							<div></div>
						)}
					</div>
					<div className="text-sm	text-secondary-text text-right">
						{activeTab == "staking" && "Amount staked"}
					</div>
				</div>

				{activeTab == "staking" ? (
					<div>
						<div className="grid grid-cols-[1fr_150px_150px_150px_200px] gap-3 h-[72px]  border-t-[1px] border-secondary-bg">
							<div className="flex items-center gap-3">
								<img
									src="/images/eth.png"
									alt=""
									className="w-10 h-10 object-contain"
								/>

								<div>Astrovault</div>
							</div>

							<div className="flex flex-col justify-center">
								5.1%
							</div>

							<div className="flex flex-col justify-center">
								100%
							</div>

							<div className="flex flex-col justify-center">
								<div className="flex items-center gap-1">
									<div className="w-[6px] h-[6px] rounded-full bg-positive" />
									Active
								</div>
							</div>

							<div className="flex items-center justify-end gap-1 cursor-pointer text-secondary-text">
								<div>10,345,456.01</div>
								<Icons.chevronRight />
							</div>
						</div>

						<div className="grid grid-cols-[1fr_150px_150px_150px_200px] gap-3 h-[72px]  border-t-[1px] border-secondary-bg">
							<div className="flex items-center gap-3">
								<img
									src="/images/uni.png"
									alt=""
									className="w-10 h-10 object-contain"
								/>

								<div>Cosmatation</div>
							</div>

							<div className="flex flex-col justify-center">
								5%
							</div>

							<div className="flex flex-col justify-center">
								53.4%
							</div>

							<div className="flex flex-col justify-center">
								<div className="flex items-center gap-1">
									<div className="w-[6px] h-[6px] rounded-full bg-positive" />
									Active
								</div>
							</div>

							<div className="flex items-center justify-end gap-1 cursor-pointer text-secondary-text">
								<div>45,456.01</div>
								<Icons.chevronRight />
							</div>
						</div>
					</div>
				) : (
					<Validators />
				)}
			</div>

			{stakeModal && <StakeModal onHide={() => setStakeModal(false)} />}

			{isSignTransactionModal && (
				<SignTranactionModal
					onHide={() => setIsSignTransactionModal(false)}
				/>
			)}
		</div>
	);
}
