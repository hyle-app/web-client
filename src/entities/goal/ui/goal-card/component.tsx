import { timeService } from '&shared/services/time';
import { EntityCard } from '&shared/ui/entity-card';
import { Icon } from '&shared/ui/icon';
import { Typography } from '&shared/ui/typography';
import { clamp } from '&shared/utils';
import { Props } from './types';

// TODO: Add overdue details
export function GoalCard({ title, className, progress, emoji, timeLeft, overdueDetails, ...attributes }: Props) {
	const expirationBlock =
		(overdueDetails && (
			<div className="flex gap-1">
				<Typography variant="caption-1" className="text-color-error">
					Просрочено на {overdueDetails.value} {timeService.lib.getUnitLabel(overdueDetails.unit, overdueDetails.value)}
				</Typography>
			</div>
		)) ??
		null;

	const timerBlock =
		(timeLeft && (
			<div className="flex gap-1">
				<Icon name="calendar" className="w-4 h-4" />
				<Typography variant="caption-1">
					Осталось {timeLeft.value} {timeService.lib.getUnitLabel(timeLeft.unit, timeLeft.value)}
				</Typography>
			</div>
		)) ??
		null;

	return (
		<EntityCard
			className={className}
			relationSlot={expirationBlock || timerBlock}
			titleSlot={<Typography>{title}</Typography>}
			leftSlot={emoji && <EntityCard.Emoji code={emoji} className="shrink-0" />}
			rightSlot={
				<EntityCard.ProgressCircleBar
					progressValue={clamp(0, 1, progress.current / progress.target)}
					className="shrink-0"
				/>
			}
			additionSlot={
				progress.target > 1 && (
					<span className="flex">
						<Typography variant="caption-1" className="text-color-gray-80">
							{progress.current} из&nbsp;
						</Typography>
						<Typography variant="caption-1">
							{progress.target}
							{' ' + (progress.label ?? '')}
						</Typography>
					</span>
				)
			}
			{...attributes}
		/>
	);
}
