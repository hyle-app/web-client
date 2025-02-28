import { habitEntity, HabitCard } from '&entities/habit';
import { timeService } from '&shared/services/time';
import { Button } from '&shared/ui/button';
import { Icon } from '&shared/ui/icon';
import { useUnit } from 'effector-react';
import { Props } from './types';
import React from 'react';
import { CreateHabitFormSidebar } from '&features/create-habit';
import { EditHabitFormSidebar } from '&features/edit-habit';
import { completeHabitFeature } from '&features/complete-habit';
import { inputs, outputs } from './model';
import { EntityColumn } from '&shared/ui/entity-column';
import { goalEntity } from '&entities/goal';

export function HabitListWidget({ className, ...attributes }: Props) {
	const {
		habits,
		selectedAppDateStart,
		fillComplexHabitDayProgressEvent,
		completeSimpleHabitEvent,
		selectedHabitId,
		setSelectedHabitIdEvent,
		getGoalOrAchievementById,
		resetSelectedHabitIdEvent
	} = useUnit({
		habits: habitEntity.outputs.$currentAppDateHabits,
		selectedAppDateStart: timeService.outputs.$currentAppDateStart,
		completeSimpleHabitEvent: completeHabitFeature.inputs.completeSimpleHabit,
		fillComplexHabitDayProgressEvent: completeHabitFeature.inputs.fillComplexHabitDayProgress,
		selectedHabitId: outputs.$selectedHabitId,
		setSelectedHabitIdEvent: inputs.setSelectedHabitId,
		resetSelectedHabitIdEvent: inputs.resetSelectedHabitId,
		getGoalOrAchievementById: goalEntity.outputs.$getGoalOrAchievementById
	});

	const [isCreateFormVisible, setIsCreateFormVisible] = React.useState(false);

	const closeCreateHabitForm = React.useCallback(() => {
		setIsCreateFormVisible(false);
	}, []);
	const openCreateHabitForm = React.useCallback(() => {
		setIsCreateFormVisible(true);
	}, []);

	return (
		<EntityColumn
			titleSlot="Привычки"
			iconSlot={<Icon name="habit" className="h-6 w-6 text-color-warning" />}
			createButtonSlot={
				<Button variant="icon" appearance="primary" className="h-8 w-8" onClick={openCreateHabitForm}>
					<Icon name="plus" className="h-4 w-4 text-color-white" />
				</Button>
			}
			className={className}
			footerSlot={
				<>
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
				</>
			}
			cardsSlot={habits.map((habit) => {
				return (
					<HabitCard
						key={habit.id}
						title={habit.title}
						emoji={habit.emoji}
						onClick={() => setSelectedHabitIdEvent(habit.id)}
						overallProgress={{ current: habit.currentProgress, target: habit.targetProgress }}
						relatedGoalName={getGoalOrAchievementById(habit.linkedGoalId)?.title ?? null}
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
			{...attributes}
		/>
	);
}
