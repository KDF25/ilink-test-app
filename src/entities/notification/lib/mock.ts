import type { Notification } from "../model/types";

const mockTraders = ["John", "Alice", "Bob", "Emma", "Michael", "Sarah"];
const mockLeverages = [10, 20, 50, 100];

export const generateRandomTrade = (): Omit<
	Notification,
	"id" | "isExiting"
> => {
	return {
		name: mockTraders[Math.floor(Math.random() * mockTraders.length)],
		tradeType: Math.random() > 0.5 ? "Long" : "Short",
		leverage:
			mockLeverages[Math.floor(Math.random() * mockLeverages.length)],
		timestamp: new Date()
	};
};
