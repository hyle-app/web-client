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
					className="w-full cursor-pointer px-4 py-2 focus:outline-none focus:bg-color-gray-10 transition-colors relative data-[state=checked]:text-color-brand-primary-50"
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
							'w-full text-start outline-none border-0 !border-b border-transparent border-solid focus:border-b-color-brand-primary-50 relative pl-4 !m-0',
							inputClassName
						)}
						ref={rootElementRef}
					>
						<Select.Value
							className="w-full ml-4"
							placeholder={<span className="text-color-gray-80 font-medium w-full ">{label}</span>}
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

				{value && clearable && (
					<Select.SelectIcon asChild>
						<button
							className="group-hover:opacity-100 opacity-0 transition-opacity pointer-events-none group-hover:pointer-events-auto text-color-gray-80 group"
							onClick={handleClear}
						>
							<Icon name="plus" className="w-6 h-6 rotate-45" />
						</button>
					</Select.SelectIcon>
				)}

				<Select.Portal container={rootElementRef.current}>
					<Select.Content
						className="z-select-dropdown w-[var(--radix-select-trigger-width)] rounded-2xl overflow-hidden"
						position="popper"
						sticky="always"
					>
						<ScrollArea.Root className="w-full h-full" type="auto">
							<Select.Viewport asChild>
								<ScrollArea.Viewport className="max-h-[256px] w-full h-full bg-color-bg-100">
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
	return <Icon {...props} className={cn('w-6 h-6 text-color-gray-80', className)} />;
}

SeamlessSelect.Icon = LeftIcon;
