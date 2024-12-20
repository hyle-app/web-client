import { authService } from '&shared/services/auth';
import { sample } from 'effector';
import { inputs, internals, outputs } from './model';
import { mapHabitToDTO } from './mappers';
import { habitEntity } from '&entities/habit';
import { spread } from 'patronum';

sample({
	clock: inputs.editHabit,
	source: {
		user: authService.outputs.$user,
		habitsList: habitEntity.outputs.$habitsList
	},
	filter: authService.outputs.$isLoggedIn,
	fn: ({ user, habitsList }, { formValues, habitId }) => {
		const habit = habitsList.find((habit) => habit.id === habitId);
		if (!habit) {
			throw new Error('Habit not found');
		}

		const newHabitState = habitEntity.lib.updateHabitWithFormValues(habit, formValues);

		return {
			remote: {
				habit: mapHabitToDTO(newHabitState),
				customerId: user!.uid
			},
			local: { habit: newHabitState }
		};
	},
	target: spread({
		remote: internals.editHabitFx,
		local: habitEntity.inputs.updateHabit
	})
});

sample({
	clock: internals.editHabitFx.done,
	target: outputs.habitEdited
});
