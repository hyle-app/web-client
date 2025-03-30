import { cn } from '&shared/utils';
import React from 'react';
import { Icon } from '../icon';
import { Props, SmallButtonProps } from './types';
import { timeService } from '&shared/services/time';
import { Typography } from '../typography';

export function CalendarFieldShortcuts({
	onTodayPress,
	onTomorrowPress,
	onCalendarPress,
	className,
	value,
	...attributes
}: Props) {
	const isTodayActive = React.useMemo(() => {
		if (Array.isArray(value)) {
			return value[1] === null && timeService.lib.isToday(value[0]);
		}

		return timeService.lib.isToday(value);
	}, [value]);

	const isTomorrowActive = React.useMemo(() => {
		if (Array.isArray(value)) {
			return value[1] === null && timeService.lib.isTomorrow(value[0]);
		}

		return timeService.lib.isTomorrow(value);
	}, [value]);

	return (
		<div className={cn('flex gap-2', className)} {...attributes}>
			<SmallButton onClick={onTodayPress} isActive={isTodayActive}>
				<Typography variant="caption-1" className={cn(isTodayActive && 'text-color-white')}>
					Сегодня
				</Typography>
			</SmallButton>
			<SmallButton onClick={onTomorrowPress} isActive={isTomorrowActive}>
				<Typography variant="caption-1" className={cn(isTomorrowActive && 'text-color-white')}>
					Завтра
				</Typography>
			</SmallButton>
			<SmallButton onClick={onCalendarPress} isActive={!isTomorrowActive && !isTodayActive}>
				<Icon className={cn(!isTomorrowActive && !isTodayActive && 'text-color-white', 'h-4 w-4')} name="calendar" />
			</SmallButton>
		</div>
	);
}

function SmallButton({ className, onClick, children, isActive, ...attributes }: SmallButtonProps) {
	return (
		<button
			className={cn('h-8 rounded-2xl px-4', isActive && 'bg-color-brand-primary-50 text-color-white', className)}
			onClick={onClick}
			{...attributes}
		>
			{children}
		</button>
	);
}
