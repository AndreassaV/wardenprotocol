import { Icons } from "@/components/ui/icons-assets";
import { useQueryHooks } from "@/hooks/useClient";
import Long from "long";

const ActiveIntent = ({ activeIntentId }: { activeIntentId: number }) => {
	const intent = useQueryHooks().warden.intent.useIntentById({
		request: { id: Long.fromInt(activeIntentId) },
	});

	return (
		<div className="text-secondary-text flex items-center">
			{intent.data?.intent?.name}
			<Icons.chevronSecondary />
		</div>
	);
};

export default ActiveIntent;
