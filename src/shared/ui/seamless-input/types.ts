export type Props<Value extends string | number = string> = {
	leftSlot?: React.ReactNode;
	label: string;
	value: Value;
	defaultValue?: Value;
	onChange?(value: Value): void;
	hideLeftSlotWhenHasContnent?: boolean;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value' | 'defaultValue'>;
