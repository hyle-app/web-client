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
	...attributes
}: Props<Value>): React.ReactNode {
	const [isFocused, setIsFocused] = React.useState(false);

	const handleChange = React.useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			onChange?.(event.target.value as Value);
		},
		[onChange]
	);

	const handleFocus = React.useCallback(
		(event: React.FocusEvent<HTMLInputElement>) => {
			setIsFocused(true);
			attributes.onFocus?.(event);
		},
		[attributes.onFocus]
	);
	const handleBlur = React.useCallback(
		(event: React.FocusEvent<HTMLInputElement>) => {
			setIsFocused(false);
			attributes.onBlur?.(event);
		},
		[attributes.onBlur]
	);

	const isContentPresented = value.toString().length > 0;
	const isInputVisible = isFocused || isContentPresented;
	const isLeftSlotVisible = hideLeftSlotWhenHasContnent ? !isContentPresented : true;

	return (
		<label className={cn('flex gap-4 items-center', className)}>
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
			<div className="flex flex-col relative">
				<p
					className={cn(' capitalize  text-color-gray-80 transition-all ', {
						'-translate-y-full font-paragraph  text-caption-1': isInputVisible,
						'text-paragraph font-medium': !isInputVisible
					})}
				>
					{label}
				</p>
				<input
					{...attributes}
					value={value}
					defaultValue={defaultValue}
					onChange={handleChange}
					onBlur={handleBlur}
					onFocus={handleFocus}
					className={cn(
						'opacity-100 absolute top-1/2 left-0 -translate-y-1/2 transition-all bg-transparent border-b border-b-transparent focus:border-b-color-brand-primary-50 outline-none',
						{
							'pointer-events-none opacity-0': !isInputVisible
						}
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
