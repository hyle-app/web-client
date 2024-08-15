type Option<Value = string> = {
	value: Value;
	label: string;
	key?: string;
};

export type Props<Value = string> = {
	options: Option<Value>[];
	onChange(value: Value | undefined): void;
	value?: Value | undefined;
	hideLeftSlotWhenHasContnent?: boolean;
	label?: React.ReactNode;
	leftSlot?: React.ReactNode;
};
