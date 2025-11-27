export const formatToDollars = (value: string | number): string => {
	const numValue = typeof value === "string" ? parseFloat(value) : value;
	return new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
		minimumFractionDigits: 0,
		maximumFractionDigits: 0
	}).format(numValue);
};
