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
				<Typography variant="caption-1">Сегодня</Typography>
			</SmallButton>
			<SmallButton onClick={onTomorrowPress} isActive={isTomorrowActive}>
				<Typography variant="caption-1">Завтра</Typography>
			</SmallButton>
			<SmallButton onClick={onCalendarPress} isActive={!isTomorrowActive && !isTodayActive}>
				<Icon name="calendar" className="w-4 h-4" />
			</SmallButton>
		</div>
	);
}

function SmallButton({ className, onClick, children, isActive, ...attributes }: SmallButtonProps) {
	return (
		<button
			className={cn(
				'h-8 text-color-gray-80 px-4 rounded-2xl',
				{
					'bg-color-brand-primary-50 text-color-white': isActive
				},
				className
			)}
			onClick={onClick}
			{...attributes}
		>
			{children}
		</button>
	);
}
