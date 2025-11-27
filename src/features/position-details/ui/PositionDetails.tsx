import { ChevronDown } from "lucide-react";

import { Button } from "@/shared/ui";

export const PositionDetails: React.FC = () => {
	return (
		<div className="px-4 py-3 flex gap-4">
			<div className="flex items-center">
				<span className="text-slate-400 text-xs">Position details</span>
			</div>
			<div className="ml-auto flex gap-3 ">
				<Button variant={"gray"} className="py-1 px-5">
					<span className="text-xs">Margin</span>
					<div>$10</div>
				</Button>
				<Button variant={"gray"} className="py-1 px-5">
					<span className="text-xs">Leverage</span>
					<div>10x</div>
				</Button>
			</div>
			<div className="flex items-center">
				<ChevronDown size={16} />
			</div>
		</div>
	);
};
