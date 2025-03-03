import { EntityCard } from '&shared/ui/entity-card';
import { Icon } from '&shared/ui/icon';
import { Typography } from '&shared/ui/typography';
import { clamp } from '&shared/utils';
import { Props } from './types';

export function HabitCard({
	title,
	emoji,
	overallProgress,
	dailyProgress,
	relatedGoalName,
	className,
	...attributes
}: Props) {
	return (
		<EntityCard
			className={className}
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
			titleSlot={<Typography>{title}</Typography>}
			leftSlot={emoji && <EntityCard.Emoji code={emoji} className="shrink-0" />}
			rightSlot={
				<EntityCard.ProgressCircleBar
					progressValue={clamp(0, 1, overallProgress.current / overallProgress.target)}
					className="shrink-0"
				/>
			}
			additionSlot={
				dailyProgress && (
					<span className="flex">
						<Typography variant="caption-1" className="text-color-gray-80">
							{dailyProgress.current} из&nbsp;
						</Typography>
						<Typography variant="caption-1">
							{dailyProgress.target}
							{' ' + (dailyProgress.label ?? '')}
						</Typography>
					</span>
				)
			}
			{...attributes}
		/>
	);
}
