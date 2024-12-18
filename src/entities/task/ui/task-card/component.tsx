import { timeService } from '&shared/services/time';
import { Checkbox } from '&shared/ui/checkbox';
import { EntityCard } from '&shared/ui/entity-card';
import { Icon } from '&shared/ui/icon';
import { Typography } from '&shared/ui/typography';
import { cn } from '&shared/utils';

import { CompletableSubtaskCard } from '../completable-subtask-card';
import { Props } from './types';

export function TaskCard({
	title,
	isCompleted,
	targetDate,
	overdueDetails,
	relatedGoalName,
	className,
	subtasks,
	onSubtaskCompletionToggle,
	onCompletionToggle,
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
			leftSlot={
				<div
					className="w-6 h-10 flex items-center justify-center shrink-0"
					onClick={(event) => {
						if (onCompletionToggle) event.stopPropagation();
					}}
				>
					<Checkbox checked={isCompleted} onChange={onCompletionToggle} />
				</div>
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
							<CompletableSubtaskCard
								key={subtask.id}
								isCompleted={subtask.isCompleted}
								onCompletionToggle={() => onSubtaskCompletionToggle?.(subtask.id)}
							>
								{subtask.title}
							</CompletableSubtaskCard>
						))}
					</EntityCard.ChildrenIndent>
				)
			}
			{...attributes}
		/>
	);
}
