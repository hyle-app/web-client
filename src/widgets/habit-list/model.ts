import { habitEntity, HabitId } from '&entities/habit';
import { routerService } from '&shared/services/router';
import { combine, createEvent, sample } from 'effector';

const selectedHabitIdStorage = routerService.outputs.createQueryParamStorage('selected_habit_id');

const setSelectedHabitId = createEvent<HabitId>();
const $selectedHabitId = combine(
	{ selectedHabitId: selectedHabitIdStorage.$value, knownHabits: habitEntity.outputs.$habitsList },
	({ selectedHabitId, knownHabits }) => {
		if (!selectedHabitId) return null;

		const habit = knownHabits.find((habit) => habit.id === selectedHabitId);
		if (!habit) return null;

		return selectedHabitId;
	}
);
const resetSelectedHabitId = selectedHabitIdStorage.reset;

// NOTE: This one is to prevent user getting invalid state on page reload in case server did not return selected habit for any reason
sample({
	clock: habitEntity.outputs.initialHabitsFetched,
	source: { selectedHabitId: $selectedHabitId, storageValue: selectedHabitIdStorage.$value },
	filter: ({ selectedHabitId, storageValue }) => selectedHabitId === null && storageValue !== null,
	fn: () => null as unknown as void,
	target: resetSelectedHabitId
});

sample({
	clock: setSelectedHabitId,
	fn: (habitId) => ({ value: habitId }),
	target: selectedHabitIdStorage.set
});

export const outputs = {
	$selectedHabitId
};

export const inputs = {
	setSelectedHabitId,
	resetSelectedHabitId
};
