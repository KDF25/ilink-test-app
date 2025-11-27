export type TradeType = "Long" | "Short";

export type Notification = {
	id: string;
	name: string;
	tradeType: TradeType;
	leverage: number;
	timestamp: Date;
	isExiting?: boolean;
};
