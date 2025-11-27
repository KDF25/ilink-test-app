import type { ChartPaginationProps } from "../model/types";

export const ChartPagination: React.FC<ChartPaginationProps> = ({
	total,
	current,
	onChange
}) => {
	return (
		<div className="p-4 flex items-center justify-center gap-1.5">
			{Array.from({ length: total }, (_, i) => {
				const isActive = i === current;
				return (
					<button
						key={i}
						onClick={() => onChange?.(i)}
						className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
							isActive
								? "w-6 bg-primary"
								: "w-1.5 bg-slate-600 hover:bg-slate-500"
						}`}
						aria-label={`Page ${i + 1}`}
					/>
				);
			})}
		</div>
	);
};
