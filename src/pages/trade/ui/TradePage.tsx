import { useState } from "react";

import { useIsMobile } from "@/shared/hooks";

import { BottomNavigation } from "@/features/bottom-navigation";
import { ChartPagination } from "@/features/chart-pagination";
import {
	NotificationsOverlay,
	useTradeNotifications
} from "@/features/notifications-feed";
import { PositionDetails } from "@/features/position-details";
import { PriceChart, usePriceChart } from "@/features/price-chart";
import { PriceStats } from "@/features/price-stats";
import { TimeframeSwitcher } from "@/features/timeframe-switcher";
import { TokenFavoriteButton } from "@/features/token-favorite";
import { TokenSettingsButton } from "@/features/token-settings";
import { TradeActions } from "@/features/trade-actions";
import { TradingPairInfo } from "@/features/trading-pair";

export const TradePage: React.FC = () => {
	const {
		chartData,
		xAxisData,
		yAxisTicks,
		currentPrice,
		priceChange,
		timeframe,
		changeTimeframe,
		timeframes
	} = usePriceChart();
	const { notifications } = useTradeNotifications();
	const [currentPage, setCurrentPage] = useState(0);
	const isMobile = useIsMobile();

	const content = (
		<div>
			<TradingPairInfo label="BTC/USDC" />
			<PriceStats
				currentPrice={currentPrice}
				priceChange={priceChange}
				actions={
					<>
						<TokenFavoriteButton />
						<TokenSettingsButton />
					</>
				}
			/>
			<PriceChart
				data={chartData}
				xAxisData={xAxisData}
				yAxisTicks={yAxisTicks}
				currentPrice={currentPrice}
				overlay={<NotificationsOverlay notifications={notifications} />}
			/>
			<TimeframeSwitcher
				active={timeframe}
				timeframes={timeframes}
				onChange={changeTimeframe}
			/>
			<ChartPagination
				total={5}
				current={currentPage}
				onChange={setCurrentPage}
			/>
			<div className="flex flex-col border-t rounded-t-3xl">
				<PositionDetails />
				<TradeActions />
				<BottomNavigation />
			</div>
		</div>
	);

	return isMobile ? (
		<div className="min-h-screen bg-background text-white flex flex-col">
			{content}
		</div>
	) : (
		<div className="min-h-screen bg-slate-950 text-white p-4 flex items-center justify-center">
			<div className="w-full max-w-md bg-background rounded-3xl shadow-2xl overflow-hidden">
				{content}
			</div>
		</div>
	);
};
