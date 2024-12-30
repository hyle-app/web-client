import { sample } from 'effector';
import { inputs, internals, outputs } from './model';
import { authService } from '&shared/services/auth';
import { mapDtoToHabit } from './mappers';

sample({
	clock: inputs.fetchHabitsOfDay,
	source: {
		user: authService.outputs.$user
	},
	filter: authService.outputs.$isLoggedIn,
	fn: ({ user }, timestamp) => ({ dateTimestamp: timestamp, customerId: user!.uid }),
	target: internals.fetchHabitsOfDayFx
});

sample({
	clock: internals.fetchHabitsOfDayFx.done,
	source: { habitsList: outputs.$habitsList },
	fn: ({ habitsList }, { result }) => {
		const newHabits = result.map((dto) => mapDtoToHabit(dto));
		const ids = newHabits.map((habit) => habit.id);
		return [...habitsList.filter((habit) => !ids.includes(habit.id)), ...newHabits];
	},
	target: outputs.$habitsList
});

sample({
	clock: inputs.addHabit,
	source: { habitsList: outputs.$habitsList },
	fn: ({ habitsList }, habit) => [...habitsList, habit],
	target: outputs.$habitsList
});

sample({
	clock: inputs.updateHabit,
	source: { habitsList: outputs.$habitsList },
	fn: ({ habitsList }, { habit }) => {
		const habitIndex = habitsList.findIndex((h) => h.id === habit.id);

		if (habitIndex === -1) {
			return habitsList;
		}

		const newHabitsList = [...habitsList];

		newHabitsList[habitIndex] = habit;
		return newHabitsList;
	},
	target: outputs.$habitsList
});

sample({
	clock: inputs.deleteHabit,
	source: { habitsList: outputs.$habitsList },
	fn: ({ habitsList }, { habitId }) => habitsList.filter((habit) => habit.id !== habitId),
	target: outputs.$habitsList
});

sample({
	clock: inputs.deleteHabit,
	source: { user: authService.outputs.$user },
	filter: authService.outputs.$isLoggedIn,
	fn: ({ user }, { habitId }) => ({ habitId, customerId: user!.uid }),
	target: internals.deleteHabitFx
});
