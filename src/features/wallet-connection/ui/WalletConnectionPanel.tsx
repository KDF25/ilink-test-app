import { ChevronDown } from "lucide-react";

import { ICONS } from "@/shared/assets";
import { Button } from "@/shared/ui";

import { useWalletConnection } from "../model/useWalletConnection";

export const WalletConnectionPanel: React.FC = () => {
	const { isConnected, connect } = useWalletConnection();
	const price = 15_000;
	return (
		<div>
			{!isConnected ? (
				<Button
					variant={"active"}
					onClick={connect}
					className="text-xs border-none bg-primary/10"
				>
					Connect Wallet
				</Button>
			) : (
				<div className="grid grid-cols-[1fr_max-content]">
					<Button
						variant={"ghost"}
						className="rounded-r-none border gap-1"
					>
						<div className="w-5 h-5 bg-blue-500 rounded-full text-xs flex items-center justify-center">
							$
						</div>
						<span className="text-xs">
							{price.toLocaleString("en-US", {
								minimumFractionDigits: 2
							})}
						</span>
						<ChevronDown size={20} />
					</Button>
					<div className="bg-amber-400 rounded-r-xl flex items-center px-2">
						<img src={ICONS.WalletIcon} alt="wallet" />
					</div>
				</div>
			)}
		</div>
	);
};
