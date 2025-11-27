export type ChartPaginationProps = {
	total: number;
	current: number;
	onChange?: (page: number) => void;
};
