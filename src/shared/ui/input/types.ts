export type Props = {
	leftSlot?: React.ReactNode;
	label: string;
	labelClassName?: string;
	inputClassName?: string;
} & React.TextareaHTMLAttributes<HTMLInputElement>;
