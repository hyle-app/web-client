/* eslint-disable no-mixed-spaces-and-tabs */
export type Option<Value = string> = {
	value: Value;
	label: string;
	key?: string;
};

export type RenderOption<Value, Options extends Option<Value>> = (params: {
	option: Options;
	isSelected: boolean;
}) => React.ReactNode;
export type RenderSelected<Value, Options extends Option<Value>> = (option: Options) => React.ReactNode;

export type Props<Value, Options extends Option<Value>> = {
	options: Options[];
	onChange(value: Value | undefined): void;
	value?: Value | undefined;
	hideLeftSlotWhenHasContnent?: boolean;
	label?: React.ReactNode;
	inputClassName?: string;
	contentWrapperClassName?: string;
	leftSlot?: React.ReactNode;
	error?: string | null | undefined;
	clearable?: boolean;
} & Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> &
	(
		| {
				renderOption: RenderOption<Value, Options>;
				renderSelected: RenderSelected<Value, Options>;
		  }
		| {
				renderOption?: void;
				renderSelected?: void;
		  }
	);
