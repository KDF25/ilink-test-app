import { navigationConfig } from "../model";

export const BottomNavigation: React.FC = () => {
	return (
		<div className="flex justify-around items-center px-4 pt-2 pb-4">
			{navigationConfig.map((item, index) => {
				const isActive = index === 0;
				const textClasses = isActive
					? "text-amber-400 font-semibold bg-amber-400/10 rounded-xl p-2"
					: "text-slate-400";

				return (
					<button
						key={item.name}
						className={`flex flex-col items-center gap-1 hover:text-white transition cursor-pointer relative`}
						type="button"
					>
						<div
							className={`${textClasses} w-9 h-9 flex items-center justify-center relative`}
						>
							<img
								src={item.icon}
								alt={item.name}
								className={`h-5 w-5 `}
							/>
							{item.badge && (
								<span className="absolute -top-3 left-5 bg-primary/30 text-primary text-[8px] font-bold px-1 py-0.5 rounded-full min-w-[20px] text-center">
									{item.badge}
								</span>
							)}
						</div>
						<span className="text-xs">{item.name}</span>
					</button>
				);
			})}
		</div>
	);
};
