import { useEffect, useMemo, useRef, useState } from "react";

import {
	type ChartDataPoint,
	type Timeframe,
	type XAxisData,
	aggregateData,
	calculateNormalizedTicks,
	generateXAxisData,
	getPreviousIntervalPrice
} from "@/entities/market";

const DEFAULT_TIMEFRAMES: Timeframe[] = ["15S", "1M", "1H", "1D"];

type UsePriceChartResult = {
	chartData: ChartDataPoint[];
	xAxisData: XAxisData;
	yAxisTicks: number[];
	currentPrice: number;
	priceChange: number;
	timeframe: Timeframe;
	changeTimeframe: (timeframe: Timeframe) => void;
	timeframes: Timeframe[];
};

export const usePriceChart = (): UsePriceChartResult => {
	const [timeframe, setTimeframe] = useState<Timeframe>("1D");
	const [currentPrice, setCurrentPrice] = useState(15_050);
	const [priceChange, setPriceChange] = useState(0);
	const priceIntervalRef = useRef<ReturnType<typeof setInterval> | null>(
		null
	);

	// Имитация обновления цены (не обязательно, так как данные статичны)
	useEffect(() => {
		const updatePrice = () => {
			// Просто добавляем небольшое колебание к текущей цене для имитации
			setCurrentPrice((prev) => {
				const volatility = prev * 0.001; // ±0.1%
				return prev + (Math.random() - 0.5) * 2 * volatility;
			});
		};

		priceIntervalRef.current = setInterval(updatePrice, 2500);
		return () => {
			if (priceIntervalRef.current) {
				clearInterval(priceIntervalRef.current);
			}
		};
	}, []);

	const chartData = useMemo(() => aggregateData(timeframe, 60), [timeframe]);
	const xAxisData = useMemo(
		() => generateXAxisData(chartData, timeframe),
		[chartData, timeframe]
	);
	const yAxisTicks = useMemo(
		() => calculateNormalizedTicks(chartData),
		[chartData]
	);

	useEffect(() => {
		if (chartData.length === 0) {
			return;
		}

		const current = chartData[chartData.length - 1].price;
		const previous = getPreviousIntervalPrice(chartData, timeframe);
		const change = ((current - previous) / previous) * 100;
		setPriceChange(change);
		setCurrentPrice(Math.round(current * 100) / 100);
	}, [chartData, timeframe]);

	const changeTimeframe = (nextTimeframe: Timeframe) => {
		if (nextTimeframe === timeframe) {
			return;
		}
		setTimeframe(nextTimeframe);
	};

	return {
		chartData,
		xAxisData,
		yAxisTicks,
		currentPrice,
		priceChange,
		timeframe,
		changeTimeframe,
		timeframes: DEFAULT_TIMEFRAMES
	};
};
