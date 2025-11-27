import { useState } from "react";

type UseWalletConnectionResult = {
	isConnected: boolean;
	balance: number;
	connect: () => void;
	disconnect: () => void;
};

export const useWalletConnection = (
	initialBalance = 15_000
): UseWalletConnectionResult => {
	const [isConnected, setIsConnected] = useState(false);

	const connect = () => setIsConnected(true);
	const disconnect = () => setIsConnected(false);

	return {
		isConnected,
		balance: initialBalance,
		connect,
		disconnect
	};
};
