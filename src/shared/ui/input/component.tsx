import { cn } from '&shared/utils';
import React, { useId } from 'react';
import { Props } from './types';

function InputWithRef(
	{ leftSlot, className, label, labelClassName, inputClassName, suggestions, ...props }: Props,
	ref: React.Ref<HTMLInputElement>
) {
	const [isFocused, setIsFocused] = React.useState(false);

	const handleFocus = React.useCallback(
		(event: React.FocusEvent<HTMLInputElement>) => {
			setIsFocused(true);
			props.onFocus?.(event);
		},
		[props.onFocus]
	);
	const handleBlur = React.useCallback(
		(event: React.FocusEvent<HTMLInputElement>) => {
			setIsFocused(false);
			props.onBlur?.(event);
		},
		[props.onBlur]
	);

	const isLabelMinified = isFocused || (props.value && props.value?.toString().length > 0);
	const id = useId();

	return (
		<label className={cn('relative block hover:cursor-pointer', className)}>
			{leftSlot ?? null}
			{label && (
				<p
					className={cn(
						'absolute left-6 top-1/2 -translate-y-1/2 normal-case text-color-gray-80 transition-all',
						{
							'top-2 -translate-y-0 text-caption-1 font-paragraph': isLabelMinified,
							'text-paragraph font-medium': !isLabelMinified
						},
						labelClassName
					)}
				>
					{label}
				</p>
			)}
			<input
				{...props}
				ref={ref}
				onBlur={handleBlur}
				onFocus={handleFocus}
				className={cn('w-full rounded-[16px] border-color-gray-10 bg-color-bg-100 px-6 py-2 pt-6', inputClassName)}
				list={suggestions && suggestions.length > 0 ? `suggestions-${id}` : undefined}
			/>
			{suggestions && suggestions.length > 0 && (
				<datalist id={id}>
					{suggestions.map((suggestion) => (
						<option key={suggestion.value} value={suggestion.value}>
							{suggestion.label}
						</option>
					))}
				</datalist>
			)}
		</label>
	);
}

export const Input = React.forwardRef(InputWithRef);
