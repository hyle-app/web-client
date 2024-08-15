import { habitEntity, HabitCard } from '&entities/habit';
import { timeService } from '&shared/services/time';
import { Button } from '&shared/ui/button';
import { Icon } from '&shared/ui/icon';
import { Typography } from '&shared/ui/typography';
import { useUnit } from 'effector-react';
import { Props } from './types';
import { cn } from '&shared/utils';

export function HabitListWidget({ className, ...attributes }: Props) {
	const { habits, selectedAppDateStart } = useUnit({
		habits: habitEntity.outputs.$currentAppDateHabits,
		selectedAppDateStart: timeService.outputs.$currentAppDateStart
	});

	return (
		<section className={cn('overflow-y-scroll no-scrollbar pb-6', className)} {...attributes}>
			<div className="px-4 py-6 rounded-2xl border-1 border border-color-gray-10 grow-1 min-h-full">
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-2">
						<Icon name="refresh" className="text-color-warning w-6 h-6" />
						<Typography variant="heading-4" className="font-semibold">
							Привычки
						</Typography>
					</div>
					<Button variant="icon" appearance="primary" className="w-8 h-8">
						<Icon name="plus" className="w-4 h-4 text-color-white" />
					</Button>
				</div>
				<div className="flex flex-col gap-4 mt-6">
					{habits.map((habit) => {
						return (
							<HabitCard
								key={habit.id}
								title={habit.title}
								emoji={habit.emoji}
								overallProgress={{ current: habit.currentProgress, target: habit.targetProgress }}
								dailyProgress={
									habit.dailyTargetProgressDetails && habit.dailyTargetProgressDetails.targetProgress > 1
										? {
												current: habit.dailyProgressSnaphots[selectedAppDateStart] ?? 0,
												target: habit.dailyTargetProgressDetails.targetProgress,
												label: habit.dailyTargetProgressDetails.label
											}
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
