import { Button } from "@/shared/ui";

export const TradeActions: React.FC = () => {
	return (
		<div className="px-4 py-2 grid grid-cols-2 gap-3 ">
			<Button variant={"emerald"} className="py-4 text-sm">
				Long
			</Button>
			<Button variant={"red"} className="py-4 text-sm">
				Short
			</Button>
		</div>
	);
};
