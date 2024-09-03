export type Props<Value extends string | number = string> = {
	label?: string | undefined;
	value: Value;
	defaultValue?: Value;
	onChange?(value: Value): void;
	leftSlot?: React.ReactNode;
	inputClassName?: string;
	labelClassName?: string;

	/**
	 * Marker if left slot should be hidden when input has content
	 * If `false` left slot will be always visible
	 * Default is `true`
	 */
	hideLeftSlotWhenHasContnent?: boolean;

	/**
	 * Marker if placeholder should be shown as a label when input has content
	 * If `false` placeholder will hide when content is presented
	 * Default is `true`
	 */
	persistantLabel?: boolean;

	/**
	 * Marker that states if input should be multiline
	 * If `true` input will be a textarea
	 * Default is `false`
	 */
	multiline?: boolean;
} & Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement | HTMLInputElement>, 'onChange' | 'value' | 'defaultValue'>;
