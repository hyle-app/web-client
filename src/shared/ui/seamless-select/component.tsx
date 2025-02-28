import * as Select from '@radix-ui/react-select';
import * as ScrollArea from '@radix-ui/react-scroll-area';
import { Icon } from '&shared/ui/icon';

import type { Props, Option } from './types';
import { cn } from '&shared/utils';
import React from 'react';
import { ErrorMessage } from '../error-message';

export function SeamlessSelect<Value extends string = string, Options extends Option<Value> = Option<Value>>({
	options,
	value,
	onChange,
	leftSlot,
	label,
	hideLeftSlotWhenHasContnent = false,
	className,
	inputClassName,
	renderOption,
	renderSelected,
	contentWrapperClassName,
	error,
	clearable = true,
	disabled,
	emptyOptionsSlot,
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
			if (renderOption) {
				return (
					<Select.Item asChild value={option.value} key={option.key ?? option.value}>
						{renderOption({ option, isSelected: option.value === value })}
					</Select.Item>
				);
			}

			return (
				<Select.Item
					value={option.value}
					key={option.key ?? option.value}
					className="relative w-full cursor-pointer px-4 py-2 transition-colors focus:bg-[#f9faff] focus:outline-none data-[state=checked]:text-color-brand-primary-50"
				>
					<Select.ItemText>{option.label}</Select.ItemText>
				</Select.Item>
			);
		},
		[renderOption]
	);

	const rootElementRef = React.useRef<HTMLButtonElement>(null);

	const finalRenderSelected = React.useCallback(
		(value: Value | undefined) => {
			if (!value || !renderOption || !options.find((option) => option.value === value)) {
				return (
					<Select.Trigger
						disabled={disabled}
						className={cn(
							'relative !m-0 w-full border-0 !border-b border-solid border-transparent pl-4 text-start outline-none focus:border-b-color-brand-primary-50',
							inputClassName
						)}
						ref={rootElementRef}
					>
						<Select.Value
							className="ml-4 w-full"
							placeholder={<span className="w-full font-medium text-color-gray-80">{label}</span>}
						/>

						{error && <ErrorMessage className="absolute -bottom-1 translate-y-full">{error}</ErrorMessage>}
					</Select.Trigger>
				);
			}

			const option = options.find((option) => option.value === value)!;
			return (
				<Select.Trigger className={cn('relative', inputClassName)} ref={rootElementRef} disabled={disabled}>
					{renderSelected!(option)}
					{error && <ErrorMessage className="absolute -bottom-1 translate-y-full">{error}</ErrorMessage>}
				</Select.Trigger>
			);
		},
		[renderSelected, options, error]
	);

	return (
		<div
			className={cn('group/input flex items-center py-4', className)}
			{...attributes}
			data-selected={Boolean(value ?? '')}
		>
			{leftSlot && (
				<div
					className={cn('h-6 w-6 transition-all will-change-auto', {
						'-ml-4 w-0 opacity-0': !isLeftSlotVisible,
						'opacity-1': isLeftSlotVisible
					})}
				>
					{leftSlot}
				</div>
			)}
			{/* @ts-expect-error suppresses the issue wiht root typing when string | undefined is not assignable to `propsName?: string` type */}
			<Select.Root value={value ?? ''} onValueChange={onChange}>
				{finalRenderSelected(value)}

				{value && clearable && (
					<Select.SelectIcon asChild>
						<button
							className="pointer-events-none text-color-gray-80 opacity-0 transition-opacity group-hover/input:pointer-events-auto group-hover/input:opacity-100"
							onClick={handleClear}
						>
							<Icon name="plus" className="h-6 w-6 rotate-45" />
						</button>
					</Select.SelectIcon>
				)}

				<Select.Portal container={rootElementRef.current}>
					<Select.Content
						className="z-select-dropdown w-[var(--radix-select-trigger-width)] overflow-hidden rounded-2xl"
						position="popper"
						sticky="always"
					>
						<ScrollArea.Root className="h-full w-full" type="auto">
							<Select.Viewport asChild>
								<ScrollArea.Viewport className="h-full max-h-[256px] w-full bg-color-bg-100">
									{!options.length && Boolean(emptyOptionsSlot) && <div className="px-6 py-4">{emptyOptionsSlot}</div>}
									{options.map((option) => finalRenderOption(option, value))}
								</ScrollArea.Viewport>
							</Select.Viewport>
						</ScrollArea.Root>
					</Select.Content>
				</Select.Portal>
			</Select.Root>
		</div>
	);
}

function LeftIcon({ className, ...props }: React.ComponentProps<typeof Icon>) {
	return (
		<Icon
			{...props}
			className={cn(
				'h-6 w-6 text-color-gray-80 transition-colors group-data-[selected="true"]/input:text-color-text-and-icon-80',
				className
			)}
		/>
	);
}

SeamlessSelect.Icon = LeftIcon;
