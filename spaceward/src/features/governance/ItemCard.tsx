import clsx from "clsx";
import type { ProposalParsed } from "./types";
import { formatStatus, formatVotes } from "./util";

export default function GovernanceCard({
	item,
	place,
}: {
	item: ProposalParsed;
	place: number;
}) {
	const votes = formatVotes(item);
	const status = formatStatus(item);
	return (
		<div className="rounded-xl bg-tertiary  cursor-pointer hover:outline-1px outline-offset-0 outline-pixel-pink  hover:outline ease-out duration-200">
			<div className="py-5 px-6 flex flex-col justify-between h-[208px]">
				<div className="flex justify-between gap-4">
					<div className="font-semibold">
						#{place} {item.name}
					</div>

					<div
						className={clsx(
							"rounded-2xl py-1 px-2 text-xs w-fit h-fit",
							status.classNames,
						)}
					>
						{status.text}
					</div>
				</div>

				<div className="flex items-center gap-3">
					{votes.total ? (
						<div className="group relative">
							<img
								src="/images/graph-example.png"
								className="w-10 h-10 object-contain"
								alt=""
							/>
							<div className="opacity-0 w-fit bg-[rgba(229,238,255,0.15)] text-white text-center text-xs rounded py-2 px-3 absolute z-10 group-hover:opacity-100 top-[-18px] left-1/2 pointer-events-none whitespace-nowrap	backdrop-blur-[20px] translate-x-[-50%] translate-y-[-100%]  before:content-[''] before:absolute before:left-[50%] before:bottom-0  before:border-[rgba(229,238,255,0.15)] before:border-b-[8px]  before:border-l-[8px] before:border-t-[transparent]  before:border-r-[transparent] before:border-t-[8px]  before:border-r-[8px] before:w-0 before:h-0 before:rotate-[-45deg] before:translate-y-[50%] before:translate-x-[-50%]">
								<div className="flex gap-2 items-center">
									<div className="bg-positive w-[6px] h-[6px] rounded-full" />
									Yes, {(votes.yes * 100).toFixed(0)}%
								</div>
								<div className="flex gap-2 items-center">
									<div className="bg-negative w-[6px] h-[6px] rounded-full" />
									No, {(votes.no * 100).toFixed(0)}%
								</div>
								<div className="flex gap-2 items-center">
									<div className="bg-pixel-pink w-[6px] h-[6px] rounded-full" />
									No with veto, {votes.noWithVeto.toFixed(0)}%
								</div>
								<div className="flex gap-2 items-center">
									<div className="bg-fill-gray w-[6px] h-[6px] rounded-full" />
									Abstain, {(votes.abstain * 100).toFixed(0)}%
								</div>
							</div>
						</div>
					) : null}
					{votes.totalStr} votes
				</div>
			</div>
			<div className="bg-lightgray p-6 flex justify-between rounded-br-xl rounded-bl-xl">
				<div>
					<div className="text-secondary-text text-xs">
						Voting start
					</div>
					<div>
						{item.votingStart.getDate()}{" "}
						{item.votingStart.toLocaleString("en-US", {
							month: "long",
						})}
						, {item.votingStart.getFullYear().toString().slice(-2)}
					</div>
				</div>
				<div className="text-right">
					<div className="text-secondary-text text-xs">
						Voting end
					</div>
					<div>
						{item.votingEnd.getDate()}{" "}
						{item.votingEnd.toLocaleString("en-US", {
							month: "long",
						})}
						, {item.votingEnd.getFullYear().toString().slice(-2)}
					</div>
				</div>
			</div>
		</div>
	);
}
