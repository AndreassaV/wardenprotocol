import type { Timestamp } from "@wardenprotocol/wardenjs/codegen/google/protobuf/timestamp";
import type { MetadataJSON, ProposalParsed } from "./types";
import { hasKey } from "@/utils/validate";
import { ProposalStatus } from "@wardenprotocol/wardenjs/codegen/cosmos/gov/v1/gov";

export function parseMetadata(metadata: string): MetadataJSON {
	try {
		const json = JSON.parse(metadata);

		if (json.title && json.description && json.forum && json.other) {
			return json;
		}

		throw new Error("Unexpected metadata format");
	} catch (e) {
		return {
			title: "Unexpected metadata",
			description: hasKey("message", e) ? e.message : "No description",
			forum: "",
			other: "",
		};
	}
}

export function parseTimestamp(timestamp?: Timestamp) {
	const sec = timestamp?.seconds.toNumber() ?? 0;
	const ms = timestamp?.nanos ? Math.floor(timestamp.nanos / 1e6) : 0;
	return 1000 * sec + ms;
}

type VoteKey = Extract<keyof ProposalParsed, `${string}Votes`>;
const SHORT_NUM = [
	{
		val: 1e9,
		unit: "B",
	},
	{
		val: 1e6,
		unit: "M",
	},
	{
		val: 1e3,
		unit: "K",
	},
] as const;

function shortNum(num: number, fixed: number = 2) {
	for (const { val, unit } of SHORT_NUM) {
		if (num < val) {
			continue;
		}

		const int = Math.floor(num / val);
		const _fra = num % val;
		const dec = Math.floor(Math.log10(_fra));
		const fra = Math.floor(_fra / 10 ** (dec - fixed + 1));

		return fra
			? `${int}.${fra.toString(10).padStart(fixed, "0")}${unit}`
			: `${int}${unit}`;
	}

	return num.toFixed(fixed);
}

export function formatVotes(votes: Pick<ProposalParsed, VoteKey>) {
	const total =
		votes.abstainVotes +
		votes.noVotes +
		votes.noWithVetoVotes +
		votes.yesVotes;

	const abstain = votes.abstainVotes / total;
	const no = votes.noVotes / total;
	const noWithVeto = votes.noWithVetoVotes / total;
	const yes = votes.yesVotes / total;

	return {
		abstain,
		no,
		noWithVeto,
		yes,
		total,
		totalStr: shortNum(total / 1e6),
	};
}

export function formatStatus({ status }: Pick<ProposalParsed, "status">) {
	let text = "Unknown";
	let classNames: string = "bg-secondary-bg";

	switch (status) {
		case ProposalStatus.PROPOSAL_STATUS_PASSED:
			text = "Passed";
			classNames = "bg-positive-secondary text-positive";
			break;
		case ProposalStatus.PROPOSAL_STATUS_REJECTED:
			text = "Rejected";
			classNames = "bg-orange-secondary text-orange";
			break;
		case ProposalStatus.PROPOSAL_STATUS_FAILED:
			text = "Failed";
			classNames = "bg-negative-secondary text-negative";
			break;
		case ProposalStatus.PROPOSAL_STATUS_VOTING_PERIOD:
			text = "Voting";
			break;
		case ProposalStatus.PROPOSAL_STATUS_DEPOSIT_PERIOD:
			text = "Deposit";
			break;
		case ProposalStatus.UNRECOGNIZED:
		case ProposalStatus.PROPOSAL_STATUS_UNSPECIFIED:
		default:
	}

	return { text, classNames };
}
