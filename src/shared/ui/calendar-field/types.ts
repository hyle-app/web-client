/* eslint-disable no-mixed-spaces-and-tabs */
export type Props<Mode extends 'range' | 'single' = 'single'> = {
	className?: string;
	required?: boolean;
	mode: Mode;
	value: Mode extends 'single' ? Date | null : [Date | null, Date | null];
	onChange: Mode extends 'single' ? (date: Date) => void : (date: [Date, Date | null]) => void;
	label?: React.ReactNode;
	leftSlot?: React.ReactNode;
	isForceOpen?: boolean;
	onClose?(): void;
	error?: string | null;
	disabled?: boolean;
};
