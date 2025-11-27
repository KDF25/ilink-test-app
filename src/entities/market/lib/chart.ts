import type {
	ChartDataPoint,
	RawDataPoint,
	Timeframe,
	XAxisData
} from "../model/types";

const BASE_INTERVAL_MS = 30_000; // 30 секунд
const BASE_SPAN_DAYS = 60; // 60 дней
const BASE_PRICE = 15_050;

let baseDataCache: RawDataPoint[] | null = null;

const generateBaseData = (): RawDataPoint[] => {
	if (baseDataCache) {
		return baseDataCache;
	}

	const data: RawDataPoint[] = [];
	let price = BASE_PRICE;
	const now = Date.now();
	const totalMs = BASE_SPAN_DAYS * 24 * 60 * 60 * 1000;
	const totalPoints = Math.floor(totalMs / BASE_INTERVAL_MS);
	const startTime = now - totalMs;

	for (let i = 0; i < totalPoints; i++) {
		const timestamp = startTime + i * BASE_INTERVAL_MS;
		const volatility = price * 0.003; // ±0.3%
		const trend = price * 0.0005 * Math.sin(i / 500); // лёгкий синусоиды

		price += (Math.random() - 0.5) * 2 * volatility + trend;
		price = Math.max(BASE_PRICE * 0.6, Math.min(BASE_PRICE * 1.4, price));

		data.push({
			price: Math.round(price * 100) / 100,
			timestamp: new Date(timestamp)
		});
	}

	baseDataCache = data;
	return data;
};

export const getTimeframeConfig = (timeframe: Timeframe) => {
	const configs = {
		"15S": { intervalMs: 15_000, displayPoints: 60 },
		"1M": { intervalMs: 60_000, displayPoints: 60 },
		"1H": { intervalMs: 3_600_000, displayPoints: 60 },
		"1D": { intervalMs: 86_400_000, displayPoints: 60 }
	} as const;

	return configs[timeframe];
};

export const createInitialRawData = (): RawDataPoint[] => {
	return generateBaseData();
};

export const aggregateData = (
	timeframe: Timeframe,
	displayPoints: number = 60
): ChartDataPoint[] => {
	const data = generateBaseData();
	const { intervalMs } = getTimeframeConfig(timeframe);
	const lastTime = data[data.length - 1].timestamp.getTime();
	const windowStartTime = lastTime - intervalMs * displayPoints;

	let currentSlotTime = Math.ceil(windowStartTime / intervalMs) * intervalMs;
	let slotIndex = 0;
	const result: ChartDataPoint[] = [];

	while (currentSlotTime <= lastTime && result.length < displayPoints) {
		const slotEndTime = currentSlotTime + intervalMs;
		const point = data.find(
			(item) =>
				item.timestamp.getTime() >= currentSlotTime &&
				item.timestamp.getTime() < slotEndTime
		);

		if (point) {
			result.push({
				time: slotIndex,
				price: point.price,
				timestamp: new Date(currentSlotTime),
				displayLabel: buildDisplayLabel(point.timestamp, timeframe)
			});
			slotIndex++;
		}

		currentSlotTime += intervalMs;
	}

	return result;
};

const buildDisplayLabel = (slotTimestamp: Date, timeframe: Timeframe) => {
	if (timeframe === "15S") {
		return slotTimestamp.toLocaleTimeString("en-US", {
			hour: "2-digit",
			minute: "2-digit",
			second: "2-digit",
			hour12: false
		});
	}

	if (timeframe === "1M") {
		return slotTimestamp.toLocaleTimeString("en-US", {
			hour: "2-digit",
			minute: "2-digit",
			hour12: false
		});
	}

	if (timeframe === "1H") {
		const day = String(slotTimestamp.getDate()).padStart(2, "0");
		const hour = String(slotTimestamp.getHours()).padStart(2, "0");
		return `Day ${day} ${hour}:00`;
	}

	const monthNames = [
		"Jan",
		"Feb",
		"Mar",
		"Apr",
		"May",
		"Jun",
		"Jul",
		"Aug",
		"Sep",
		"Oct",
		"Nov",
		"Dec"
	];
	const day = String(slotTimestamp.getDate()).padStart(2, "0");
	return `${monthNames[slotTimestamp.getMonth()]} ${day}`;
};

export const generateXAxisData = (
	data: ChartDataPoint[],
	timeframe: Timeframe
): XAxisData => {
	if (data.length === 0) {
		return { ticks: [], labels: {}, allTicks: [] };
	}

	const labels: Record<number, string> = {};
	const ticks: number[] = [];
	const allTicks: number[] = [];

	for (let i = 0; i < data.length; i++) {
		allTicks.push(i);
	}

	if (timeframe === "15S") {
		const fiveMinutesMs = 5 * 60 * 1000;
		let lastPrimaryTime = -Infinity;

		for (let i = 0; i < data.length; i++) {
			const timeMs = data[i].timestamp.getTime();
			if (
				timeMs - lastPrimaryTime >= fiveMinutesMs ||
				i === data.length - 1
			) {
				labels[i] = data[i].timestamp.toLocaleTimeString("en-US", {
					hour: "2-digit",
					minute: "2-digit",
					hour12: false
				});
				ticks.push(i);
				lastPrimaryTime = timeMs;
			}
		}
	} else if (timeframe === "1M") {
		const fifteenMinutesMs = 15 * 60 * 1000;
		let lastPrimaryTime = -Infinity;

		for (let i = 0; i < data.length; i++) {
			const timeMs = data[i].timestamp.getTime();
			if (
				timeMs - lastPrimaryTime >= fifteenMinutesMs ||
				i === data.length - 1
			) {
				labels[i] = data[i].timestamp.toLocaleTimeString("en-US", {
					hour: "2-digit",
					minute: "2-digit",
					hour12: false
				});
				ticks.push(i);
				lastPrimaryTime = timeMs;
			}
		}
	} else if (timeframe === "1H") {
		let lastDay = -1;
		for (let i = 0; i < data.length; i++) {
			const currentDay = data[i].timestamp.getDate();
			if (currentDay !== lastDay || i === data.length - 1) {
				labels[i] = String(currentDay);
				ticks.push(i);
				lastDay = currentDay;
			}
		}
	} else if (timeframe === "1D") {
		const monthNames = [
			"Jan",
			"Feb",
			"Mar",
			"Apr",
			"May",
			"Jun",
			"Jul",
			"Aug",
			"Sep",
			"Oct",
			"Nov",
			"Dec"
		];
		let lastMonth = -1;
		for (let i = 0; i < data.length; i++) {
			const currentMonth = data[i].timestamp.getMonth();
			if (currentMonth !== lastMonth || i === data.length - 1) {
				labels[i] = monthNames[currentMonth];
				ticks.push(i);
				lastMonth = currentMonth;
			}
		}
	}

	return { ticks, labels, allTicks };
};

export const calculateNormalizedTicks = (data: ChartDataPoint[]): number[] => {
	if (data.length === 0) {
		return [15_000];
	}

	const prices = data.map((point) => point.price);
	const min = Math.min(...prices);
	const max = Math.max(...prices);
	const range = max - min;

	if (range < 1) {
		return [Math.floor(min), Math.ceil(max)];
	}

	const segmentCount = 6;
	const rawStep = range / segmentCount;
	const magnitude = Math.pow(10, Math.floor(Math.log10(rawStep)));
	const normalized = Math.ceil(rawStep / magnitude) * magnitude;
	const ticks: number[] = [];
	const tickMin = Math.floor(min / normalized) * normalized;

	for (let i = 0; i <= segmentCount + 1; i++) {
		const tick = tickMin + i * normalized;
		if (tick <= max + normalized) {
			ticks.push(tick);
		}
	}

	return ticks;
};

export const getPreviousIntervalPrice = (
	data: ChartDataPoint[],
	timeframe: Timeframe
): number => {
	if (data.length < 2) {
		return data[data.length - 1]?.price ?? 15_050;
	}

	const { intervalMs } = getTimeframeConfig(timeframe);
	const currentTime = data[data.length - 1].timestamp.getTime();
	const previousIntervalTime = currentTime - intervalMs;

	let closestPrice = data[0].price;
	let minDiff = Math.abs(data[0].timestamp.getTime() - previousIntervalTime);

	for (let i = 1; i < data.length; i++) {
		const diff = Math.abs(
			data[i].timestamp.getTime() - previousIntervalTime
		);
		if (diff < minDiff) {
			minDiff = diff;
			closestPrice = data[i].price;
		}
	}

	return closestPrice;
};
