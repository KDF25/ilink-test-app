type TradingHeaderProps = {
	onClose?: () => void;
};

export const TradingHeader: React.FC<TradingHeaderProps> = ({ onClose }) => {
	return (
		<div className="flex items-center justify-between p-4 bg-card">
			<div className="flex items-center gap-2">
				<div className="w-6 h-6 bg-slate-700 rounded-full flex items-center justify-center text-xs">
					⋯
				</div>
				<span className="text-xs text-slate-400">Mini App</span>
			</div>
			<button
				className="text-slate-400 hover:text-white transition"
				onClick={onClose}
			>
				✕
			</button>
		</div>
	);
};
