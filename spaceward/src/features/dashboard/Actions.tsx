import { LoaderCircle } from "lucide-react";
import { useMemo } from "react";
import { Link } from "react-router-dom";
import { Accordion } from "@/components/ui/accordion";
import { useAddressContext } from "@/hooks/useAddressContext";
import { prettyActionStatus } from "@/utils/formatting";
import { Icons } from "@/components/ui/icons-assets";
import { useQueryHooks } from "@/hooks/useClient";
import { ActionStatus } from "@wardenprotocol/wardenjs/codegen/warden/act/v1beta1/action";

export function Actions() {
	const { address } = useAddressContext();
	const { isReady, warden } = useQueryHooks();

	const q = warden.act.v1beta1.useActionsByAddress({
		request: {
			address,
			status: ActionStatus.ACTION_STATUS_UNSPECIFIED,
		},
		options: {
			enabled: isReady,
		},
	});

	const actions = q.data?.actions;

	const groups = useMemo(
		() =>
			actions?.reduce<{ [key: string]: typeof actions }>(
				(groups, action) => {
					const iso = new Date(
						Number(action.createdAt.seconds) * 1000,
					).toISOString();
					const date = iso.split("T")[0];
					if (!groups[date]) {
						groups[date] = [];
					}
					groups[date].push(action);
					return groups;
				},
				{},
			),
		[actions],
	);

	const actionsArrays = useMemo(
		() =>
			groups
				? Object.keys(groups)
						.map((date) => {
							return {
								date,
								actions: groups[date],
							};
						})
						.reverse()
				: undefined,
		[groups],
	);

	if (q.status === "loading" || !actions?.length) {
		return (
			<div className="bg-card border-[1px] flex-col gap-5 border-border-secondary rounded-2xl flex items-center justify-center text-center mt-8 p-16">
				{q.status === "loading" ? (
					<LoaderCircle className="animate-spin mt-2" />
				) : (
					<div className="text-xl	font-bold">No actions yet</div>
				)}
			</div>
		);
	}

	return (
		<div className="bg-card  py-5 px-6 mt-6 border-[1px] border-border-secondary rounded-2xl">
			<div className="flex justify-between items-center gap-2 mb-3">
				<div className="font-bold text-2xl flex items-center justify-between">
					Last actions
				</div>
				<Link
					to="/actions"
					className="font-semibold text-muted-foreground"
				>
					See All
				</Link>
			</div>
			<div className="flex items-center">
				<Accordion
					type="single"
					collapsible
					className="space-y-0 w-full"
				>
					{actionsArrays?.map((group) => {
						const group_date = new Date(group?.date);
						return (
							<div className="flex flex-col" key={group.date}>
								<span className="mb-5 text-label-tertiary text-sm">
									{group_date.toLocaleDateString("en-GB", {
										weekday: "long",
										year: "numeric",
										month: "long",
										day: "numeric",
									})}
								</span>
								<div>
									{group.actions.map((action) => {
										const date = new Date(
											Number(action.createdAt.seconds),
										);
										const shortTime =
											new Intl.DateTimeFormat("en", {
												timeStyle: "short",
											});
										return (
											<div
												key={action.id}
												className={`py-3`}
											>
												<div className="flex flex-row hover:no-underline">
													<div className="grid gap-x-2 gap-y-5 grid-cols-[70px_174px_1fr_0.5fr_1fr] w-full">
														<div className="text-left">
															#
															{action.id.toString()}
														</div>
														<div className="text-left">
															{(
																action.msg as any
															) /* fixme */?.[
																"@type"
															]
																?.replace(
																	"/warden.warden.v1beta2.Msg",
																	"",
																)
																.replace(
																	/([A-Z])/g,
																	" $1",
																)
																.trim()}
														</div>
														<div>
															{action.intent.id.toString() ==
															"0"
																? `Default intent`
																: `Intent #${action.intent.id.toString()}`}
														</div>
														<div>
															{shortTime.format(
																date,
															)}
														</div>
														<div className="flex justify-end">
															<div className="w-fit flex items-center p-1 pr-2 gap-1 text-muted-foreground border-[1px] border-text-muted-foreground text-xs rounded">
																<Icons.grayCheckmark stroke="currentColor" />
																{prettyActionStatus(
																	action?.status,
																)}
															</div>
														</div>
													</div>
												</div>
											</div>
										);
									})}
								</div>
							</div>
						);
					})}
				</Accordion>
			</div>
		</div>
	);
}
