import { timeService } from '&shared/services/time';
import { Checkbox } from '&shared/ui/checkbox';
import { EntityCard } from '&shared/ui/entity-card';
import { Icon } from '&shared/ui/icon';
import { Typography } from '&shared/ui/typography';
import { cn } from '&shared/utils';

import { CompletableSubtaskCard } from '../completable-subtask-card';
import { Props } from './types';

export function CompletableTaskCard({
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
						'shrink-1 text-color-gray-80 line-through': isCompleted
					})}
				>
					{title}
				</Typography>
			}
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
			leftSlot={
				<div
					className="flex h-10 w-6 shrink-0 items-center justify-center"
					onClick={(event) => {
						if (onCompletionToggle) event.stopPropagation();
					}}
				>
					<Checkbox checked={isCompleted} onChange={onCompletionToggle} />
				</div>
			}
			rightSlot={
				overdueDetails && (
					<div className="flex shrink-0 flex-col items-end">
						<span className="flex items-center gap-1 text-color-gray-80">
							<Typography variant="caption-1">
								{targetDate && timeService.lib.format(targetDate, 'DD.MM.YY')}
							</Typography>
							<Icon name="calendar" className="h-4 w-4" />
						</span>
						<Typography variant="caption-1" className="text-color-error">
							<span>{overdueDetails.value} </span>
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
