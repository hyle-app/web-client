import React from 'react';

import { cn } from '&shared/utils';
import { Icon } from '&shared/ui/icon';

import { Props } from './types';

export function SeamlessInput(props: Props<string>): React.ReactNode;
export function SeamlessInput(props: Props<number>): React.ReactNode;
export function SeamlessInput<Value extends number | string = string>({
	leftSlot,
	value,
	defaultValue,
	onChange,
	label,
	className,
	hideLeftSlotWhenHasContnent = true,
	persistantLabel = true,
	multiline,
	inputClassName,
	labelClassName,
	...attributes
}: Props<Value>): React.ReactNode {
	const [isFocused, setIsFocused] = React.useState(false);
	const inputRef = React.useRef<typeof multiline extends true ? HTMLTextAreaElement : HTMLInputElement>(null);

	const handleChange = React.useCallback(
		(event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
			const newValue = event.target.value as Value;

			if (multiline && inputRef.current) {
				const hasUserDeletdContent = value.toString().length >= event.target.value.length;

				if (hasUserDeletdContent) {
					inputRef.current.style.height = '';
				}

				inputRef.current.style.height = `${event.target.scrollHeight}px`;
			}

			onChange?.(newValue);
		},
		[onChange, multiline, value]
	);

	React.useLayoutEffect(() => {
		if (!inputRef.current) return;

		inputRef.current.style.minHeight = `${inputRef.current.offsetHeight}px`;
	}, [inputRef.current]);

	React.useLayoutEffect(() => {
		if (value && inputRef.current && multiline && inputRef.current.scrollHeight > 0) {
			inputRef.current.style.height = `${inputRef.current.scrollHeight}px`;
		}
	}, []);

	const handleFocus = React.useCallback(
		(event: React.FocusEvent<HTMLTextAreaElement | HTMLInputElement>) => {
			setIsFocused(true);
			attributes.onFocus?.(event);
		},
		[attributes.onFocus]
	);
	const handleBlur = React.useCallback(
		(event: React.FocusEvent<HTMLTextAreaElement | HTMLInputElement>) => {
			setIsFocused(false);
			attributes.onBlur?.(event);
		},
		[attributes.onBlur]
	);

	const isContentPresented = value.toString().length > 0;
	const isInputVisible = isFocused || isContentPresented;
	const isLeftSlotVisible = hideLeftSlotWhenHasContnent ? !isContentPresented : true;

	const InputElement: typeof multiline extends true ? 'textarea' : 'input' = React.useMemo(() => {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		if (multiline) return 'textarea' as any;

		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		return 'input' as any;
	}, [multiline]);

	return (
		<label className={cn('flex gap-4 items-center py-4', className)}>
			{leftSlot && (
				<div
					className={cn('w-6 h-6 will-change-auto transition-all', {
						'opacity-0 w-0 -ml-4': !isLeftSlotVisible,
						'opacity-1 ': isLeftSlotVisible
					})}
				>
					{leftSlot}
				</div>
			)}
			<div className="flex flex-col relative w-full">
				<p
					className={cn(
						'normal-case  text-color-gray-80 transition-all absolute left-0 top-1/2 -translate-y-1/2',
						{
							'-translate-y-full top-0 font-paragraph  text-caption-1': isInputVisible,
							'text-paragraph font-medium': !isInputVisible,
							'opacity-0 pointer-events-none': isInputVisible && !persistantLabel
						},
						labelClassName
					)}
				>
					{label}
				</p>
				<InputElement
					{...attributes}
					ref={inputRef}
					value={value}
					defaultValue={defaultValue}
					onChange={handleChange}
					onBlur={handleBlur}
					onFocus={handleFocus}
					className={cn(
						'opacity-100 transition-colors-and-opacity bg-transparent border-b border-b-transparent focus:border-b-color-brand-primary-50 outline-none w-full resize-none no-scrollbar h-6 max-h-64',
						{
							'pointer-events-none opacity-0': !isInputVisible
						},
						inputClassName
					)}
				/>
			</div>
		</label>
	);
}

function LeftIcon({ className, ...props }: React.ComponentProps<typeof Icon>) {
	return <Icon {...props} className={cn('w-6 h-6 text-color-gray-80', className)} />;
}

SeamlessInput.Icon = LeftIcon;
