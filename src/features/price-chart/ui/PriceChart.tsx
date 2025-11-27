import {
	Area,
	CartesianGrid,
	ComposedChart,
	type LabelProps,
	Line,
	ReferenceLine,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis
} from "recharts";

import type { ChartDataPoint, XAxisData } from "@/entities/market";

type CartesianLabelViewBox = {
	x: number;
	y: number;
	width: number;
	height: number;
};

const hasXYCoordinates = (
	viewBox: LabelProps["viewBox"]
): viewBox is CartesianLabelViewBox => {
	return Boolean(
		viewBox &&
			typeof viewBox === "object" &&
			"x" in viewBox &&
			"y" in viewBox &&
			"width" in viewBox &&
			"height" in viewBox &&
			typeof (viewBox as Record<string, unknown>).x === "number" &&
			typeof (viewBox as Record<string, unknown>).y === "number" &&
			typeof (viewBox as Record<string, unknown>).width === "number" &&
			typeof (viewBox as Record<string, unknown>).height === "number"
	);
};

const renderCurrentPriceLabel = (props: LabelProps, price: number) => {
	const { viewBox } = props;

	if (!hasXYCoordinates(viewBox)) {
		return <g />;
	}

	const labelValue = price.toFixed(2);
	const paddingX = 4;
	const paddingY = 2;
	const fontSize = 10;
	const height = paddingY * 2 + fontSize;
	const width = labelValue.length * 6 + paddingX * 2;
	const x = viewBox.x + viewBox.width + 2;
	const y = viewBox.y - height / 2;
	const borderRadius = 4;

	return (
		<g style={{ zIndex: 9999 }}>
			<rect
				x={x}
				y={y}
				width={width}
				height={height}
				rx={borderRadius}
				ry={borderRadius}
				fill="#fbbf24"
				stroke="#facc15"
				strokeWidth={0.5}
			/>
			<text
				x={x + width / 2}
				y={y + height / 2 + 3.5}
				textAnchor="middle"
				fill="#0f172a"
				fontSize={fontSize}
				fontWeight={600}
			>
				{labelValue}
			</text>
		</g>
	);
};

type PriceChartProps = {
	data: ChartDataPoint[];
	xAxisData: XAxisData;
	yAxisTicks: number[];
	currentPrice: number;
	overlay?: React.ReactNode;
};

export const PriceChart: React.FC<PriceChartProps> = ({
	data,
	xAxisData,
	yAxisTicks,
	currentPrice,
	overlay
}) => {
	if (data.length === 0) {
		return (
			<div className="px-4 py-4  ">
				<div className="h-60 flex items-center justify-center text-slate-400 text-sm">
					Недостаточно данных для построения графика
				</div>
			</div>
		);
	}

	return (
		<div className="px-4 py-4  relative overflow-visible">
			<ResponsiveContainer width={"100%"} height={340}>
				<ComposedChart
					data={data}
					margin={{ top: 0, right: 25, left: 0, bottom: 0 }}
				>
					<defs>
						<linearGradient
							id="priceGradient"
							x1="0"
							y1="0"
							x2="0"
							y2="1"
						>
							<stop
								offset="20%"
								stopColor="#fbbf24"
								stopOpacity={0.15}
							/>
							<stop
								offset="80%"
								stopColor="#000"
								stopOpacity={0}
							/>
						</linearGradient>
					</defs>
					<CartesianGrid
						strokeDasharray="3 3"
						stroke="#334155"
						vertical={false}
					/>
					<XAxis
						dataKey="time"
						type="number"
						stroke="#64748b"
						style={{ fontSize: "10px" }}
						ticks={xAxisData.ticks}
						tickFormatter={(value: number) =>
							xAxisData.labels[value] || ""
						}
						tick={{ fill: "#64748b" }}
						allowDecimals={false}
					/>
					<YAxis
						stroke="#64748b"
						style={{ fontSize: "10px", zIndex: 1 }}
						yAxisId="right"
						orientation="right"
						ticks={yAxisTicks}
						domain={[
							Math.min(...yAxisTicks),
							Math.max(...yAxisTicks)
						]}
						tickFormatter={(value: number) => `${value.toFixed(2)}`}
						tick={{ fill: "#64748b" }}
						width={45}
					/>
					<Tooltip
						contentStyle={{
							backgroundColor: "#1e293b",
							border: "1px solid #475569",
							borderRadius: "8px",
							padding: "8px"
						}}
						labelStyle={{ color: "#e2e8f0" }}
						formatter={(value: number) => [
							value.toFixed(2),
							"Price"
						]}
						labelFormatter={(_, payload) => {
							if (payload && payload[0]) {
								return payload[0].payload.displayLabel || "";
							}
							return "";
						}}
					/>
					<Area
						type="monotone"
						dataKey="price"
						stroke="none"
						fill="url(#priceGradient)"
						fillOpacity={1}
						yAxisId="right"
						isAnimationActive={false}
					/>
					<Line
						type="monotone"
						dataKey="price"
						stroke="#fbbf24"
						dot={false}
						isAnimationActive={false}
						strokeWidth={2}
						yAxisId="right"
					/>
					<ReferenceLine
						y={currentPrice}
						stroke="#fbbf24"
						strokeDasharray="5 5"
						yAxisId="right"
						label={(props) =>
							renderCurrentPriceLabel(props, currentPrice)
						}
					/>
				</ComposedChart>
			</ResponsiveContainer>

			{overlay}
		</div>
	);
};
