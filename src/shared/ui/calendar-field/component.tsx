import React from 'react';
import { ru } from 'date-fns/locale';
import {
	DateRange,
	DayPicker,
	type PropsRangeRequired,
	type PropsSingleRequired,
	UI,
	Modifiers
} from 'react-day-picker';
import 'react-day-picker/style.css';
import { cn, devLogger } from '&shared/utils';
import { Props } from './types';
import { Icon } from '&shared/ui/icon';
import { timeService } from '&shared/services/time';
import { Typography } from '../typography';
import { Button } from '../button';

export function CalendarField<Mode extends 'range' | 'single'>({
	className,
	required,
	value,
	mode,
	label,
	leftSlot,
	...props
}: Props<Mode>) {
	type Value = Mode extends 'single' ? Date | null : [Date | null, Date | null];

	const [isPickerVisible, setIsPickerVisible] = React.useState(false);
	const [localValue, setLocalValue] = React.useState(value);

	const isValueSelected = Array.isArray(value) ? value[0] !== null : value !== null;
	const pickerRef = React.useRef<HTMLDivElement>(null);

	React.useEffect(() => {
		if (!isPickerVisible) return;

		setLocalValue(value);

		const eventHandler = (event: MouseEvent) => {
			const target = event.target as HTMLDivElement;
			if (!pickerRef.current?.contains(target)) {
				setIsPickerVisible(false);
			}
		};

		setTimeout(() => {
			window.addEventListener('click', eventHandler);
		}, 0);

		return () => {
			window.removeEventListener('click', eventHandler);
		};
	}, [isPickerVisible, value]);

	const handleClose = React.useCallback(() => {
		setIsPickerVisible(false);
	}, []);

	const handleSubmit = React.useCallback(
		(value: Value) => {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			props.onChange(value as any);
			handleClose();
		},
		[props.onChange]
	);

	const calendarLibValue = React.useMemo(
		() =>
			(mode === 'range' && Array.isArray(localValue)
				? { from: localValue[0] ?? new Date(), to: localValue[1] ?? undefined }
				: value ?? new Date()) as Mode extends 'range' ? DateRange : Date,
		[localValue, mode, value]
	);

	const handleRangeSelection = React.useCallback(
		(_range: DateRange, triggerDate: Date, _modifiers: Modifiers, _e: React.MouseEvent | React.KeyboardEvent) => {
			if (mode !== 'range' || !Array.isArray(localValue))
				return devLogger.warn('CalendarField: handleRangeSelection is called with invalid mode', { mode });

			// no value at all or only first value is selected
			if ((localValue[0] && localValue[1]) || (!localValue[0] && !localValue[1])) {
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				setLocalValue([triggerDate, null] as any);
				return;
			}

			if (localValue[0] && !localValue[1]) {
				if (localValue.at(0)!.getTime() > triggerDate.getTime()) {
					// eslint-disable-next-line @typescript-eslint/no-explicit-any
					setLocalValue([triggerDate, null] as any);
					return;
				}

				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				setLocalValue([localValue[0], triggerDate] as any);
				return;
			}
		},
		[props.onChange, localValue]
	);

	const handleChange: Mode extends 'range' ? PropsRangeRequired['onSelect'] : PropsSingleRequired['onSelect'] =
		React.useCallback(
			((value: unknown, triggerDate: Date, modifiers: Modifiers, e: React.MouseEvent | React.KeyboardEvent) => {
				if (value && typeof value === 'object' && 'from' in value && mode === 'range') {
					handleRangeSelection(value as DateRange, triggerDate, modifiers, e);
					return;
				}

				if (value) {
					handleSubmit(value as Value);
					return;
				}

				devLogger.warn('CalendarField: onSelect is called with invalid value', { value });
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
			}) as any,
			[mode, handleRangeSelection, handleSubmit]
		);

	const mainText = React.useMemo(() => {
		if (!isValueSelected) return label;

		if (mode === 'range' && Array.isArray(value) && value.at(0) && value.at(1)) {
			const from = timeService.lib.format(value.at(0)!.getTime(), 'DD MMMM');
			const to = timeService.lib.format(value.at(1)!.getTime(), 'DD MMMM');

			return `${from} - ${to}`;
		}

		if (mode === 'range' && Array.isArray(value) && value.at(0) && !value.at(1)) {
			const from = timeService.lib.format(value.at(0)!.getTime(), 'DD MMMM');

			return from;
		}

		if (mode === 'single' && value && !Array.isArray(value) && typeof value === 'object') {
			return timeService.lib.format(value.getTime(), 'DD MMMM');
		}

		throw new Error('CalendarField: mainText is called with invalid value');
	}, [label, isValueSelected, value, mode]);

	const subText = React.useMemo(() => {
		if (mode === 'single' && value && !Array.isArray(value) && typeof value === 'object') {
			return timeService.lib.format(value.getTime(), 'dd');
		}

		if (mode === 'range' && value && Array.isArray(value) && value.at(0) && !value.at(1)) {
			return timeService.lib.format(value.at(0)!.getTime(), 'dddd');
		}

		return null;
	}, [value, mode]);

	const picker = (
		<DayPicker
			required={required}
			mode={mode}
			selected={
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				calendarLibValue as any
			}
			onSelect={
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				handleChange as any
			}
			className={cn('h-full', className)}
			classNames={{
				today: 'today',
				selected: 'text-white selected',
				[UI.Day]: 'w-[36px] h-[36px] text-caption-1 text-text-and-icon-80 p-0 group',
				[UI.DayButton]:
					'w-[36px] h-[36px] !border-transparent !border !border-solid rounded-xl group-[.selected]:bg-color-brand-primary-50 group-[.today]:!border-color-brand-primary-50 text-caption-1 group-[.selected]:text-caption-1 group-[.selected]:text-text-and-icon-80',
				[UI.MonthCaption]: 'text-default font-regular h-10 flex items-center mb-4 capitalize justify-center',
				[UI.Nav]: 'h-10 absolute top-0 right-0 left-0 flex justify-between items-center',
				[UI.Weekday]:
					'text-color-text-and-icon-70 opacity-50 text-caption-1 font-normal [&:nth-child(n+6)]:text-color-error',
				[UI.ButtonPrevious]: '[--rdp-accent-color:var(--color-text-and-icon-80)] h-10 w-9',
				[UI.ButtonNext]: '[--rdp-accent-color:var(--color-text-and-icon-80)] h-10 w-9'
			}}
			locale={ru}
		/>
	);

	return (
		<div className="relative">
			<button
				className={cn('grid gap-x-4', {
					'grid-cols-[24px_auto]': Boolean(leftSlot),
					'grid-cols-1': !leftSlot
				})}
				onClick={() => {
					setIsPickerVisible(true);
				}}
			>
				{leftSlot && <div className={cn('w-6 h-6 will-change-auto transition-all row-span-1')}>{leftSlot}</div>}
				<Typography
					className={cn('font-medium', {
						'text-color-gray-80': !isValueSelected,
						'text-color-text-and-icon-80': isValueSelected
					})}
				>
					{mainText}
				</Typography>
				{subText && (
					<Typography
						className={cn('text-caption-1 text-color-gray-80 col-span-1 text-left', { 'col-start-2': leftSlot })}
					>
						{subText}
					</Typography>
				)}
			</button>

			<div
				ref={pickerRef}
				className={cn('absolute left-8 bottom-0 w-fit h-fit translate-y-full bg-color-bg-100 p-6 z-10', {
					'pointer-events-none p-0': !isPickerVisible
				})}
			>
				{isPickerVisible && picker}
				{isPickerVisible && mode === 'range' && (
					<div className="flex gap-2 justify-end">
						<Button variant="text" appearance="ghost" className="px-4 py-2" onClick={handleClose}>
							Отмена
						</Button>
						<Button variant="text" appearance="primary" className="px-4 py-2" onClick={() => handleSubmit(localValue)}>
							Сохранить
						</Button>
					</div>
				)}
			</div>
		</div>
	);
}

function LeftIcon({ className, ...props }: React.ComponentProps<typeof Icon>) {
	return <Icon {...props} className={cn('w-6 h-6 text-color-gray-80', className)} />;
}

CalendarField.Icon = LeftIcon;