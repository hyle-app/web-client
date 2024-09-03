import React from 'react';

export type Props<Value> = {
	value: Value[];
	inputClassName?: string;
	elementListClassName?: string;
	inputLabel?: string;
	groupLabel?: React.ReactNode;
	inputLeftSlot?: React.ReactNode;

	onChange(value: Value[]): void;
	newValueContructor(title: string): Value;
	renderElement(value: Value, index: number): React.ReactNode;
} & Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'value'>;
