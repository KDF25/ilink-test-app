type PriceStatsProps = {
	currentPrice: number;
	priceChange: number;
	actions?: React.ReactNode;
};

export const PriceStats: React.FC<PriceStatsProps> = ({
	currentPrice,
	priceChange,
	actions
}) => {
	const changeColor = priceChange >= 0 ? "text-green-400" : "text-red-400";

	return (
		<div className="px-4 py-4  ">
			<div className="flex items-center gap-2">
				<span className="text-3xl ">{currentPrice.toFixed(2)}</span>
				<span className={`text-lg font-semibold ${changeColor}`}>
					{priceChange >= 0 ? "+" : ""}
					{priceChange.toFixed(2)}%
				</span>
				<div className="ml-auto flex items-center gap-2">{actions}</div>
			</div>
		</div>
	);
};
