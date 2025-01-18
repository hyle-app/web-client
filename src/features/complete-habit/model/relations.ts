import { sample } from 'effector';
import { inputs, internals } from './model';
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

		return {
			remote: {
				habit: mapHabitToDTO(updatedHabitState, user!.uid),
				customerId: user!.uid
			},
			local: { habit: updatedHabitState }
		};
	},
	target: spread({
		remote: internals.completeHabitFx,
		local: habitEntity.inputs.updateHabit
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

		return {
			remote: {
				habit: mapHabitToDTO(updatedHabitState, user!.uid),
				customerId: user!.uid
			},
			local: { habit: updatedHabitState }
		};
	},
	target: spread({
		remote: internals.completeHabitFx,
		local: habitEntity.inputs.updateHabit
	})
});
