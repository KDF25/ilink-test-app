export type Timeframe = "15S" | "1M" | "1H" | "1D";

export type RawDataPoint = {
	price: number;
	timestamp: Date;
};

export type ChartDataPoint = {
	time: number;
	price: number;
	timestamp: Date;
	displayLabel?: string;
};

export type XAxisData = {
	ticks: number[];
	labels: Record<number, string>;
	allTicks: number[];
};
