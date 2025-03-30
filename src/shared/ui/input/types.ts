type Suggestion = {
	value: string;
	label: string;
};

export type Props = {
	leftSlot?: React.ReactNode;
	label: string;
	labelClassName?: string;
	inputClassName?: string;
	suggestions?: Suggestion[];
} & React.TextareaHTMLAttributes<HTMLInputElement>;
