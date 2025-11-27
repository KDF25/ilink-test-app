import { Button } from "@/shared/ui";

import type { Timeframe } from "@/entities/market";

type TimeframeSwitcherProps = {
	active: Timeframe;
	timeframes: Timeframe[];
	onChange: (timeframe: Timeframe) => void;
};

export const TimeframeSwitcher: React.FC<TimeframeSwitcherProps> = ({
	active,
	timeframes,
	onChange
}) => {
	return (
		<div className="px-4 grid grid-cols-4 gap-2 ">
			{timeframes.map((tf) => (
				<Button
					key={tf}
					onClick={() => onChange(tf)}
					variant={active === tf ? "active" : "gray"}
				>
					{tf}
				</Button>
			))}
		</div>
	);
};
