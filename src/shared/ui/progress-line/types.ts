export type Props = {
	className?: string;
	customLabel?: string | undefined;
	withDayLabel?: boolean;
	variant?: 'primary' | 'secondary';
	maxValue: number;
	value: number;
	direction?: 'direct' | 'inverse';
	labelRowEndSlot?: React.ReactNode;
};
