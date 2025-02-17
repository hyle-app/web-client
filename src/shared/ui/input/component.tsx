import { cn } from '&shared/utils';
import React from 'react';
import { Props } from './types';

function InputWithRef(
	{ leftSlot, className, label, labelClassName, inputClassName, ...props }: Props,
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

	return (
		<label className={cn('relative block', className)}>
			{leftSlot ?? null}
			{label && (
				<p
					className={cn(
						'normal-case text-color-gray-80 transition-all absolute top-1/2 -translate-y-1/2 left-6',
						{
							'top-2 -translate-y-0 font-paragraph  text-caption-1 ': isLabelMinified,
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
				className={cn('py-2 px-6 bg-color-bg-100 pt-6 border-color-gray-10 rounded-[16px] w-full', inputClassName)}
			/>
		</label>
	);
}

export const Input = React.forwardRef(InputWithRef);
