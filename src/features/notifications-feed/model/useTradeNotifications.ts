import { useEffect, useRef, useState } from "react";

import {
	type Notification,
	generateRandomTrade
} from "@/entities/notification";

type UseTradeNotificationsResult = {
	notifications: Notification[];
};

export const useTradeNotifications = (): UseTradeNotificationsResult => {
	const [notifications, setNotifications] = useState<Notification[]>([]);
	const notificationTimersRef = useRef<ReturnType<typeof setTimeout>[]>([]);
	const exitTimeoutRef = useRef<Map<string, ReturnType<typeof setTimeout>>>(
		new Map()
	);
	const notificationIndexRef = useRef(0);
	const notificationScheduleRef = useRef([2000, 2000, 2000, 7000]);

	useEffect(() => {
		const scheduleNextNotification = () => {
			const schedule = notificationScheduleRef.current;
			const delay =
				schedule[notificationIndexRef.current % schedule.length];

			const timer = setTimeout(() => {
				const trade = generateRandomTrade();
				const newNotification: Notification = {
					id: `${Date.now()}-${Math.random()}`,
					...trade,
					isExiting: false
				};

				setNotifications((prev) => [newNotification, ...prev]);

				const exitTimer = setTimeout(() => {
					setNotifications((prev) =>
						prev.map((notification) =>
							notification.id === newNotification.id
								? { ...notification, isExiting: true }
								: notification
						)
					);

					const removeTimer = setTimeout(() => {
						setNotifications((prev) =>
							prev.filter(
								(notification) =>
									notification.id !== newNotification.id
							)
						);
					}, 300);

					exitTimeoutRef.current?.set(
						newNotification.id,
						removeTimer
					);
				}, 3000);

				exitTimeoutRef.current?.set(newNotification.id, exitTimer);
				notificationIndexRef.current += 1;
				scheduleNextNotification();
			}, delay);

			notificationTimersRef.current.push(timer);
		};

		scheduleNextNotification();

		return () => {
			notificationTimersRef.current.forEach((timer) =>
				clearTimeout(timer)
			);
			notificationTimersRef.current = [];

			const exitTimers = exitTimeoutRef.current;
			exitTimeoutRef.current = new Map();

			exitTimers?.forEach((timer) => clearTimeout(timer));
			exitTimers?.clear();
		};
	}, []);

	return { notifications };
};
