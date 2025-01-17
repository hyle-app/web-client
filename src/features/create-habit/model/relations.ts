import { authService } from '&shared/services/auth';
import { sample } from 'effector';
import { inputs, internals, outputs } from './model';
import { mapDtoToHabit, mapFormValuesToDTO } from './mappers';
import { habitEntity } from '&entities/habit';

sample({
	clock: inputs.createNewHabit,
	source: { user: authService.outputs.$user },
	filter: authService.outputs.$isLoggedIn,
	fn: ({ user }, habit) => ({ habit: mapFormValuesToDTO(habit, user!.uid), customerId: user!.uid }),
	target: internals.createNewHabitFx
});

sample({
	clock: internals.createNewHabitFx.doneData,
	fn: (response) => mapDtoToHabit(response),
	target: habitEntity.inputs.addHabit
});

sample({
	clock: internals.createNewHabitFx.done,
	target: outputs.habitCreated
});
