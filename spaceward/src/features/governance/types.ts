import type { ProposalStatus } from "@wardenprotocol/wardenjs/codegen/cosmos/gov/v1/gov";

export interface ProposalParsed {
	id: string;
	name: string;
	description?: string;
	status: ProposalStatus;
	hasVotes: boolean;
	abstainVotes: number;
	noVotes: number;
	noWithVetoVotes: number;
	yesVotes: number;
	votingStart: Date;
	votingEnd: Date;
}

/**
 * @description recommended format for metadata: https://docs.cosmos.network/v0.46/modules/gov/02_state.html#proposals
 */
export interface MetadataJSON {
	title: string;
	description: string;
	forum: string;
	other: string;
}
