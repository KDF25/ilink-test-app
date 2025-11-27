import { ChevronDown } from "lucide-react";

import { Button } from "@/shared/ui";

import { WalletConnectionPanel } from "@/features/wallet-connection";

type TradingPairInfoProps = {
	label: string;
};

export const TradingPairInfo: React.FC<TradingPairInfoProps> = ({ label }) => {
	return (
		<div className="px-4 pb-3 pt-7 flex items-center justify-between gap-3">
			<Button variant={"gray"}>
				<div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center text-sm font-bold">
					₿
				</div>
				<p className="text-xs font-semibold">{label}</p>
				<p className="text-[10px] font-semibold text-slate-500">100x</p>
				<ChevronDown size={20} />
			</Button>
			<WalletConnectionPanel />
		</div>
	);
};
