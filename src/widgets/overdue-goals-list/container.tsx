import { timeService } from '&shared/services/time';
import { Button } from '&shared/ui/button';
import { Icon } from '&shared/ui/icon';
import { Typography } from '&shared/ui/typography';
import { useUnit } from 'effector-react';
import { Props } from './types';
import { cn } from '&shared/utils';
import { goalEntity, GoalCard } from '&entities/goal';

export function OverdueGoalListWidget({ className, ...attributes }: Props) {
	const { overdueGoals, realTimestamp } = useUnit({
		overdueGoals: goalEntity.outputs.$overdueGoals,
		realTimestamp: timeService.outputs.$realTimestamp
	});

	if (overdueGoals.length === 0) {
		return null;
	}

	return (
		<section className={cn('overflow-y-scroll no-scrollbar pb-6', className)} {...attributes}>
			<div className="px-4 py-6 rounded-2xl border-1 border border-color-gray-10 grow-1 min-h-full">
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-2">
						<Icon name="triangle-danger" className="text-color-error w-6 h-6" />
						<Typography variant="heading-4" className="font-semibold">
							Просроченные
						</Typography>
					</div>
					<Button variant="icon" appearance="primary" className="w-8 h-8">
						<Icon name="plus" className="w-4 h-4 text-color-white" />
					</Button>
				</div>
				<div className="flex flex-col gap-4 mt-6">
					{overdueGoals.map((goal) => {
						return (
							<GoalCard
								key={goal.id}
								title={goal.title}
								emoji={goal.emoji}
								progress={{
									current: goal.progress.currentProgress,
									target: goal.progress.targetProgress,
									label: goal.progress.label
								}}
								timeLeft={timeService.lib.getDiffInTimeUnits(realTimestamp, goal.targetDate)}
								overdueDetails={
									realTimestamp > goal.targetDate
										? timeService.lib.getDiffInTimeUnits(goal.targetDate, realTimestamp)
										: null
								}
							/>
						);
					})}
				</div>
			</div>
		</section>
	);
}
