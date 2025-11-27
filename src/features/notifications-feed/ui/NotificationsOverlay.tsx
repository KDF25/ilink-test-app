import type { Notification } from "@/entities/notification";

type NotificationsOverlayProps = {
	notifications: Notification[];
};

export const NotificationsOverlay: React.FC<NotificationsOverlayProps> = ({
	notifications
}) => {
	if (notifications.length === 0) {
		return null;
	}

	return (
		<div className="absolute bottom-12 left-4 flex flex-col-reverse gap-2 pointer-events-none">
			{notifications.map((notif, idx) => (
				<div
					key={notif.id}
					className="transition-all duration-300 ease-out transform"
					style={{
						opacity: notif.isExiting ? 0 : idx === 0 ? 1 : 0.5,
						transform: notif.isExiting
							? "scale(0.95) translateY(-10px)"
							: idx === 0
								? "scale(1) translateY(0)"
								: "scale(0.8) translateY(12px)"
					}}
				>
					<div className="text-xs">
						<div className="flex items-center gap-1">
							<span
								className={`font-semibold ${notif.tradeType === "Long" ? "text-green-400" : "text-orange-400"}`}
							>
								{notif.name}
							</span>
							<span className="text-slate-400">
								Today at{" "}
								{notif.timestamp.toLocaleTimeString("en-US", {
									hour: "2-digit",
									minute: "2-digit",
									second: "2-digit",
									hour12: false
								})}
							</span>
						</div>
						<div className="text-slate-300 mt-1">
							Opened {notif.tradeType} x{notif.leverage}
						</div>
					</div>
				</div>
			))}
		</div>
	);
};
