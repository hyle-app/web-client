export type Props = {
	onTodayPress: () => void;
	onTomorrowPress: () => void;
	onCalendarPress: () => void;
	value: number | [number, number | null];
} & React.HTMLAttributes<HTMLDivElement>;

export type SmallButtonProps = {
	onClick?: () => void;
	isActive?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;
