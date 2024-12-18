import { Typography } from '&shared/ui/typography';
import { cn } from '&shared/utils';
import { SeamlessInput } from '&shared/ui/seamless-input';
import { Props } from './types';
import React from 'react';

export function SeamlessArrayInput<Value>({
	value,
	newValueContructor,
	renderElement,
	inputLabel,
	groupLabel,
	elementListClassName,
	inputClassName,
	className,
	inputLeftSlot,
	onChange,
	onAppendNewValue,
	...attributes
}: Props<Value>) {
	const [newElementTitle, setNewElementTitle] = React.useState<string>('');

	const handleCreateInsertValue = React.useCallback(
		(newValue: Value) => {
			onChange?.([...value, newValue]);
			onAppendNewValue?.(newValue);
		},
		[onChange]
	);

	const handleNewElementTitkeKeyPress = React.useCallback(
		(event: React.KeyboardEvent) => {
			if (event.code === 'Enter') {
				const newValue = newValueContructor(newElementTitle);
				handleCreateInsertValue(newValue);
				setNewElementTitle('');
			}
		},
		[newValueContructor, setNewElementTitle, handleCreateInsertValue, newElementTitle]
	);

	const hasElements = value.length > 0;

	return (
		<div className={cn('', className)} {...attributes}>
			<div className={cn('flex flex-col gap-3', elementListClassName)}>
				{(groupLabel ?? inputLabel) && (
					<Typography
						variant="caption-1"
						className={cn('text-color-gray-80 will-change-auto', {
							'opacity-0': !hasElements,
							'opacity-100': hasElements
						})}
					>
						{groupLabel ?? inputLabel}
					</Typography>
				)}
				{value.map((element, index) => renderElement(element, index))}
			</div>
			<SeamlessInput
				label={inputLabel}
				leftSlot={inputLeftSlot}
				className={inputClassName}
				value={newElementTitle}
				onChange={setNewElementTitle}
				onKeyUp={handleNewElementTitkeKeyPress}
				persistantLabel={!hasElements}
			/>
		</div>
	);
}
