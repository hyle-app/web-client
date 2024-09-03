import * as Select from '@radix-ui/react-select';
import * as ScrollArea from '@radix-ui/react-scroll-area';
import { Icon } from '&shared/ui/icon';

import type { Props, Option } from './types';
import { cn } from '&shared/utils';
import React from 'react';

export function SeamlessSelect<Value extends string = string, Options extends Option<Value> = Option<Value>>({
	options,
	value,
	onChange,
	leftSlot,
	label,
	hideLeftSlotWhenHasContnent = true,
	className,
	inputClassName,
	renderOption,
	renderSelected,
	contentWrapperClassName,
	...attributes
}: Props<Value, Options>) {
	const isLeftSlotVisible = hideLeftSlotWhenHasContnent ? !value : true;

	const handleClear = React.useCallback(
		(event: React.MouseEvent<HTMLButtonElement>) => {
			event.preventDefault();
			event.stopPropagation();

			onChange(undefined);
		},
		[onChange]
	);

	const finalRenderOption = React.useCallback(
		(option: Options, value: Value | undefined) => {
			if (renderOption)
				return (
					<Select.Item asChild value={option.value} key={option.key ?? option.value}>
						{renderOption({ option, isSelected: option.value === value })}
					</Select.Item>
				);

			return (
				<Select.Item
					value={option.value}
					key={option.key ?? option.value}
					className="w-full cursor-pointer px-4 py-1 focus:outline-none focus:bg-color-gray-10 transition-colors relative data-[state=checked]:text-color-brand-primary-50"
				>
					<Select.ItemText>{option.label}</Select.ItemText>
				</Select.Item>
			);
		},
		[renderOption]
	);

	const finalRenderSelected = React.useCallback(
		(value: Value | undefined) => {
			if (!value || !renderOption)
				return (
					<Select.Trigger
						className={cn(
							'w-full md:max-w-[194px] text-start outline-none border-0 !border-b border-transparent border-solid focus:border-b-color-brand-primary-50 relative pl-4 !m-0',
							inputClassName
						)}
					>
						<Select.Value
							className="w-full ml-4"
							placeholder={<span className="text-color-gray-80 font-medium ">{label}</span>}
						/>
					</Select.Trigger>
				);

			const option = options.find((option) => option.value === value)!;
			return (
				<Select.Trigger asChild className={inputClassName}>
					{renderSelected!(option)}
				</Select.Trigger>
			);
		},
		[renderSelected, options]
	);

	return (
		<div className={cn('py-4 flex items-center group', className)} {...attributes}>
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
			{/* @ts-expect-error suppresses the issue wiht root typing when string | undefined is not assignable to `propsName?: string` type */}
			<Select.Root value={value ?? ''} onValueChange={onChange}>
				{finalRenderSelected(value)}

				{value && (
					<Select.SelectIcon asChild>
						<button
							className="group-hover:opacity-100 opacity-0 transition-opacity pointer-events-none group-hover:pointer-events-auto text-color-gray-80 group"
							onClick={handleClear}
						>
							<Icon name="plus" className="w-6 h-6 rotate-45" />
						</button>
					</Select.SelectIcon>
				)}

				<Select.Portal>
					<Select.Content
						position="popper"
						className={cn('w-screen md:max-w-[194px] bg-color-bg-100', contentWrapperClassName)}
					>
						<ScrollArea.Root type="auto">
							<Select.Viewport asChild className="max-h-[256px] w-full">
								<ScrollArea.Viewport className="w-full">
									{options.map((option) => finalRenderOption(option, value))}
								</ScrollArea.Viewport>
							</Select.Viewport>
							<ScrollArea.Scrollbar orientation="vertical" className="bg-color-gray-10 w-1">
								<ScrollArea.Thumb className="w-1 bg-color-brand-primary-50 rounded-sm" />
							</ScrollArea.Scrollbar>
						</ScrollArea.Root>
					</Select.Content>
				</Select.Portal>
			</Select.Root>
		</div>
	);
}

function LeftIcon({ className, ...props }: React.ComponentProps<typeof Icon>) {
	return <Icon {...props} className={cn('w-6 h-6 text-color-gray-80', className)} />;
}

SeamlessSelect.Icon = LeftIcon;
