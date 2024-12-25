import { authService } from '&shared/services/auth';
import { createEffect, sample } from 'effector';
import { inputs, internals, outputs } from './model';
import { mapDtoToHabit, mapFormValuesToDTO } from './mappers';
import { Habit, habitEntity } from '&entities/habit';

sample({
	clock: inputs.createNewHabit,
	source: { user: authService.outputs.$user },
	filter: authService.outputs.$isLoggedIn,
	fn: ({ user }, habit) => ({ habit: mapFormValuesToDTO(habit), customerId: user!.uid }),
	target: internals.createNewHabitFx
});

sample({
	clock: internals.createNewHabitFx.doneData,
	fn: (response) => mapDtoToHabit(response),
	target: createEffect((value: Habit) => {
		console.log(value);
	})
});

sample({
	clock: internals.createNewHabitFx.done,
	target: outputs.habitCreated
});
