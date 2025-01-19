import { Checkbox } from '&shared/ui/checkbox';
import { EntityCard } from '&shared/ui/entity-card';
import { Icon } from '&shared/ui/icon';
import { Typography } from '&shared/ui/typography';
import React from 'react';
import { Props } from './types';
import { timeService } from '&shared/services/time';

export function CompletableReminderCard({
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
			<div className="flex flex-col items-end shrink-0">
				<span className="flex items-center gap-1 text-color-gray-80">
					<Typography variant="caption-1">
						{targetDateTime && timeService.lib.format(targetDateTime, 'DD.MM.YY')}
					</Typography>
					<Icon name="calendar" className="w-4 h-4" />
				</span>
				<Typography variant="caption-1" className="text-color-gray-80">
					<span className="text-color-error">{overdueDetails.value} </span>
					<span>{timeService.lib.getUnitLabel(overdueDetails.unit, overdueDetails.value)}</span>
				</Typography>
			</div>
		);
	}, [overdueDetails]);

	const targetTimeBlock = React.useMemo(() => {
		return (
			<div className="flex gap-0.5 items-center">
				<Typography variant="caption-2" className="text-color-gray-80">
					{timeService.lib.format(targetDateTime, 'HH:mm')}
				</Typography>
				<Icon name="watch" className="text-color-gray-80 w-4 h-4" />
			</div>
		);
	}, [targetDateTime]);

	return (
		<EntityCard
			className={className}
			titleSlot={<Typography>{title}</Typography>}
			leftSlot={
				<div
					className="w-6 h-10 flex items-center justify-center shrink-0"
					onClick={(event) => {
						if (onToggleCompletion) event.stopPropagation();
					}}
				>
					<Checkbox checked={isCompleted} onClick={onToggleCompletion} />
				</div>
			}
			relationSlot={
				relatedGoalName && (
					<div className="flex gap-0.5 items-center">
						<Icon name="goal" className="text-color-brand-secondary-80 w-[10px] h-[10px]" />
						<Typography variant="caption-2" className="text-color-brand-secondary-80 ">
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
