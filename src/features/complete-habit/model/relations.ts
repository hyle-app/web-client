import { sample } from 'effector';
import { inputs, internals, outputs } from './model';
import { habitEntity } from '&entities/habit';
import { authService } from '&shared/services/auth';
import { spread } from 'patronum';
import { timeService } from '&shared/services/time';
import { mapHabitToDTO } from './mappers';

sample({
	clock: inputs.completeSimpleHabit,
	source: {
		habitsList: habitEntity.outputs.$habitsList,
		user: authService.outputs.$user,
		isLoggedIn: authService.outputs.$isLoggedIn,
		timestamp: timeService.outputs.$realTimestamp
	},
	filter: ({ isLoggedIn, habitsList }, { habitId }) => {
		if (!isLoggedIn) return false;

		const habit = habitsList.find((habit) => habit.id === habitId);
		if (!habit) return false;

		if (habitEntity.lib.isComplexHabit(habit)) return false;

		return true;
	},
	fn: ({ habitsList, user, timestamp }, { habitId }) => {
		const habit = habitsList.find((habit) => habit.id === habitId)!;

		const updatedHabitState = habitEntity.lib.completeSimpleHabit(habit, timestamp);

		const isCompleted = habitEntity.lib.isHabitCompletedOnDate(updatedHabitState, timestamp);

		return {
			remote: {
				habit: mapHabitToDTO(updatedHabitState, user!.uid),
				customerId: user!.uid
			},
			local: { habit: updatedHabitState },
			completedOnDay: isCompleted
				? {
						habitId,
						totalProgress: {
							old: habit.currentProgress,
							new: updatedHabitState.currentProgress,
							target: habit.targetProgress
						}
					}
				: (undefined as any)
		};
	},
	target: spread({
		remote: internals.completeHabitFx,
		local: habitEntity.inputs.updateHabit,
		completedOnDay: outputs.habitCompletedOnDay
	})
});

sample({
	clock: inputs.fillComplexHabitDayProgress,
	source: {
		habitsList: habitEntity.outputs.$habitsList,
		user: authService.outputs.$user,
		isLoggedIn: authService.outputs.$isLoggedIn,
		timestamp: timeService.outputs.$realTimestamp
	},
	filter: ({ isLoggedIn, habitsList }, { habitId }) => {
		if (!isLoggedIn) return false;

		const habit = habitsList.find((habit) => habit.id === habitId);
		if (!habit) return false;

		if (habitEntity.lib.isSimpleHabit(habit)) return false;

		return true;
	},
	fn: ({ habitsList, user, timestamp }, { habitId, progressDelta }) => {
		const habit = habitsList.find((habit) => habit.id === habitId)!;

		const updatedHabitState = habitEntity.lib.fillComplexHabitDayProgress(habit, progressDelta, timestamp);

		const commonEvents = {
			remote: {
				habit: mapHabitToDTO(updatedHabitState, user!.uid),
				customerId: user!.uid
			},
			local: { habit: updatedHabitState }
		};

		if (habitEntity.lib.isHabitCompletedOnDate(updatedHabitState, timestamp)) {
			return {
				...commonEvents,
				completedOnDay: {
					habitId,
					totalProgress: {
						old: habit.currentProgress,
						new: updatedHabitState.currentProgress,
						target: habit.targetProgress
					}
				}
			};
		}

		return {
			...commonEvents,
			partiallyCompletedOnDay: {
				habitId,
				dailyProgress: {
					old: habit.dailyProgressSnaphots[timeService.lib.getStartOfTheDay(timestamp)],
					new: updatedHabitState.dailyProgressSnaphots[timeService.lib.getStartOfTheDay(timestamp)],
					target: habit.dailyTargetProgressDetails?.targetProgress ?? 1
				}
			}
		};
	},
	target: spread({
		remote: internals.completeHabitFx,
		local: habitEntity.inputs.updateHabit,
		completedOnDay: outputs.habitCompletedOnDay,
		partiallyCompletedOnDay: outputs.habitPartiallyCompletedOnDay
	})
});
