import { timeService } from '&shared/services/time';
import { EntityCard } from '&shared/ui/entity-card';
import { Icon } from '&shared/ui/icon';
import { Typography } from '&shared/ui/typography';
import { cn } from '&shared/utils';

import { SubtaskCard } from '../subtask-card';
import { Props } from './types';

export function TaskCard({
	title,
	isCompleted,
	targetDate,
	overdueDetails,
	relatedGoalName,
	className,
	subtasks,
	...attributes
}: Props) {
	return (
		<EntityCard
			className={className}
			titleSlot={
				<Typography
					className={cn({
						'line-through text-color-gray-80 shrink-1': isCompleted
					})}
				>
					{title}
				</Typography>
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
			rightSlot={
				overdueDetails && (
					<div className="flex flex-col items-end shrink-0">
						<span className="flex items-center gap-1 text-color-gray-80">
							<Typography variant="caption-1">
								{targetDate && timeService.lib.format(targetDate, 'DD.MM.YY')}
							</Typography>
							<Icon name="calendar" className="w-4 h-4" />
						</span>
						<Typography variant="caption-1" className="text-color-gray-80">
							<span className="text-color-error">{overdueDetails.value} </span>
							<span>{timeService.lib.getUnitLabel(overdueDetails.unit, overdueDetails.value)}</span>
						</Typography>
					</div>
				)
			}
			childrenCardsSlot={
				subtasks &&
				subtasks.length > 0 && (
					<EntityCard.ChildrenIndent>
						{subtasks.map((subtask) => (
							<SubtaskCard key={subtask.id} isCompleted={subtask.isCompleted}>
								{subtask.title}
							</SubtaskCard>
						))}
					</EntityCard.ChildrenIndent>
				)
			}
			{...attributes}
		/>
	);
}
