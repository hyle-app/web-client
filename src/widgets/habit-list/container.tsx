import { habitEntity, HabitCard } from '&entities/habit';
import { timeService } from '&shared/services/time';
import { Button } from '&shared/ui/button';
import { Icon } from '&shared/ui/icon';
import { Typography } from '&shared/ui/typography';
import { useUnit } from 'effector-react';
import { Props } from './types';
import { cn } from '&shared/utils';
import React from 'react';
import { CreateHabitFormSidebar } from '&features/create-habit';
import { EditHabitFormSidebar } from '&features/edit-habit';
import { completeHabitFeature } from '&features/complete-habit';
import { inputs, outputs } from './model';
import { CheerUpSidebar } from '&features/cheer-up';

export function HabitListWidget({ className, ...attributes }: Props) {
	const {
		habits,
		selectedAppDateStart,
		fillComplexHabitDayProgressEvent,
		completeSimpleHabitEvent,
		selectedHabitId,
		setSelectedHabitIdEvent,
		resetSelectedHabitIdEvent
	} = useUnit({
		habits: habitEntity.outputs.$currentAppDateHabits,
		selectedAppDateStart: timeService.outputs.$currentAppDateStart,
		completeSimpleHabitEvent: completeHabitFeature.inputs.completeSimpleHabit,
		fillComplexHabitDayProgressEvent: completeHabitFeature.inputs.fillComplexHabitDayProgress,
		selectedHabitId: outputs.$selectedHabitId,
		setSelectedHabitIdEvent: inputs.setSelectedHabitId,
		resetSelectedHabitIdEvent: inputs.resetSelectedHabitId
	});

	const [isCreateFormVisible, setIsCreateFormVisible] = React.useState(false);

	const closeCreateHabitForm = React.useCallback(() => {
		setIsCreateFormVisible(false);
	}, []);
	const openCreateHabitForm = React.useCallback(() => {
		setIsCreateFormVisible(true);
	}, []);

	return (
		<section className={cn('overflow-y-scroll no-scrollbar pb-6', className)} {...attributes}>
			<div className="px-4 py-6 rounded-2xl border-1 border border-color-gray-10 grow-1 min-h-full">
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-2">
						<Icon name="habit" className="text-color-warning w-6 h-6" />
						<Typography variant="heading-4" className="font-semibold">
							Привычки
						</Typography>
					</div>
					<Button variant="icon" appearance="primary" className="w-8 h-8" onClick={openCreateHabitForm}>
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
								onClick={() => setSelectedHabitIdEvent(habit.id)}
								overallProgress={{ current: habit.currentProgress, target: habit.targetProgress }}
								dailyProgress={
									habit.dailyTargetProgressDetails && habit.dailyTargetProgressDetails.targetProgress > 1
										? {
												current: habit.dailyProgressSnaphots[selectedAppDateStart] ?? 0,
												target: habit.dailyTargetProgressDetails.targetProgress,
												label: habit.dailyTargetProgressDetails.label ?? ''
											}
										: null
								}
							/>
						);
					})}
				</div>
			</div>
			<CreateHabitFormSidebar isOpen={isCreateFormVisible} onClose={closeCreateHabitForm} />
			{selectedHabitId && (
				<EditHabitFormSidebar
					isOpen={true}
					onClose={() => resetSelectedHabitIdEvent()}
					habitId={selectedHabitId}
					onCompleteSimpleHabit={() => completeSimpleHabitEvent({ habitId: selectedHabitId })}
					onFillComplexHabitDayProgress={(delta) =>
						fillComplexHabitDayProgressEvent({
							habitId: selectedHabitId,
							progressDelta: delta
						})
					}
				/>
			)}
		</section>
	);
}
