import { EntityCard } from '&shared/ui/entity-card';
import { Icon } from '&shared/ui/icon';
import { Typography } from '&shared/ui/typography';
import React from 'react';
import { Props } from './types';
import { timeService } from '&shared/services/time';

export function ReminderCard({
	className,
	isCompleted,
	title,
	targetDateTime,
	relatedGoalName,
	overdueDetails,
	onToggleCompletion,
	...attributes
}: Props) {
	const expiredBlock = React.useMemo(() => {
		if (!overdueDetails) return null;

		return (
			<div className="flex shrink-0 flex-col items-end">
				<span className="flex items-center gap-1 text-color-gray-80">
					<Typography variant="caption-1">
						{targetDateTime && timeService.lib.format(targetDateTime, 'DD.MM.YY')}
					</Typography>
					<Icon name="calendar" className="h-4 w-4" />
				</span>
				<Typography variant="caption-1" className="text-color-error">
					<span>{overdueDetails.value} </span>
					<span>{timeService.lib.getUnitLabel(overdueDetails.unit, overdueDetails.value)}</span>
				</Typography>
			</div>
		);
	}, [overdueDetails]);

	const targetTimeBlock = React.useMemo(() => {
		return (
			<div className="flex items-center gap-0.5">
				<Typography variant="caption-2" className="text-color-gray-80">
					{timeService.lib.format(targetDateTime, 'HH:mm')}
				</Typography>
				<Icon name="watch" className="h-4 w-4 text-color-gray-80" />
			</div>
		);
	}, [targetDateTime]);

	return (
		<EntityCard
			className={className}
			titleSlot={<Typography>{title}</Typography>}
			relationSlot={
				relatedGoalName && (
					<div className="flex items-center gap-0.5">
						<Icon name="goal" className="h-[10px] w-[10px] text-color-brand-secondary-80" />
						<Typography variant="caption-2" className="text-color-brand-secondary-80">
							{relatedGoalName}
						</Typography>
					</div>
				)
			}
			rightSlot={expiredBlock || targetTimeBlock}
			{...attributes}
		/>
	);
}
