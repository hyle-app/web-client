import React, { useId } from 'react';

import { cn } from '&shared/utils';
import { Icon } from '&shared/ui/icon';

import { Props } from './types';
import { ErrorMessage } from '../error-message';
import { useMask } from '@react-input/mask';

export function SeamlessInput(props: Props<string>): React.ReactNode;
export function SeamlessInput(props: Props<number>): React.ReactNode;
export function SeamlessInput<Value extends number | string = string>({
	leftSlot,
	value,
	defaultValue,
	onChange,
	label,
	className,
	hideLeftSlotWhenHasContnent = false,
	persistantLabel = true,
	multiline,
	inputClassName,
	labelClassName,
	error,
	suggestions,
	mask,
	maskReplacment,
	...attributes
}: Props<Value>): React.ReactNode {
	const [isFocused, setIsFocused] = React.useState(false);
	const inputRef = React.useRef<typeof multiline extends true ? HTMLTextAreaElement : HTMLInputElement>();
	const id = useId();
	const maskInputRef = useMask({
		mask,
		replacement: maskReplacment ?? { _: /\d/ }
	});

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
		<label
			className={cn('group/input flex cursor-pointer items-center gap-4 py-4', className)}
			data-active={Boolean(value)}
		>
			{leftSlot && (
				<div
					className={cn('h-6 w-6 transition-all will-change-auto', {
						'-ml-4 w-0 opacity-0': !isLeftSlotVisible,
						'opacity-1': isLeftSlotVisible,
						'self-start': multiline
					})}
				>
					{leftSlot}
				</div>
			)}
			<div className="relative flex w-full flex-col">
				<p
					className={cn(
						'absolute left-0 top-1/2 -translate-y-1/2 normal-case text-color-gray-80 transition-all',
						{
							'top-0 -translate-y-full text-caption-1 font-paragraph': isInputVisible,
							'text-paragraph font-medium': !isInputVisible,
							'pointer-events-none opacity-0': isInputVisible && !persistantLabel
						},
						labelClassName
					)}
				>
					{label}
				</p>
				<InputElement
					{...attributes}
					ref={(node) => {
						inputRef.current = node!;
						if (mask) {
							maskInputRef.current = node!;
						}
					}}
					value={value}
					defaultValue={defaultValue}
					onChange={handleChange}
					onBlur={handleBlur}
					onFocus={handleFocus}
					list={suggestions && suggestions.length > 0 ? `suggestions-${id}` : undefined}
					className={cn(
						'no-scrollbar h-6 max-h-64 w-full resize-none border-b border-b-transparent bg-transparent opacity-100 outline-none transition-colors-and-opacity focus:border-b-color-brand-primary-50',
						{
							'pointer-events-none opacity-0': !isInputVisible
						},
						inputClassName
					)}
				/>
				{suggestions && suggestions.length > 0 && (
					<datalist id={`suggestions-${id}`}>
						{suggestions.map((suggestion) => (
							<option key={suggestion.value} value={suggestion.value}>
								{suggestion.label}
							</option>
						))}
					</datalist>
				)}
				{error && <ErrorMessage className="absolute -bottom-1 translate-y-full">{error}</ErrorMessage>}
			</div>
		</label>
	);
}

function LeftIcon({ className, ...props }: React.ComponentProps<typeof Icon>) {
	return (
		<Icon
			{...props}
			className={cn(
				'h-6 w-6 text-color-gray-80 transition-colors group-data-[active="true"]/input:text-color-text-and-icon-80',
				className
			)}
		/>
	);
}

SeamlessInput.Icon = LeftIcon;
