import { sample } from 'effector';
import { inputs, outputs } from '.';
import { debounce, reset } from 'patronum';
import { internals } from './model';
import { authService } from '&shared/services/auth';
import { mapDtoToHabit, mapDtoToReminder, mapDtoToTask } from './mapper';

sample({
	clock: inputs.changeQuery,
	target: [outputs.$query, internals.setIsTyping]
});

sample({
	clock: internals.setIsTyping,
	fn: () => true,
	target: internals.$isTyping
});

const debouncedQueryChange = debounce(inputs.changeQuery, 400);
sample({
	clock: debouncedQueryChange,
	source: authService.outputs.$user,
	fn: (user, query) => ({
		customerId: user!.uid,
		query
	}),
	target: [internals.startSearchFx, internals.resetIsTyping]
});

sample({
	clock: internals.startSearchFx.doneData,
	fn: ({ periodTasks, habits, reminders }) => {
		return {
			tasks: periodTasks.map(mapDtoToTask),
			habits: habits.map(mapDtoToHabit),
			reminders: reminders.map(mapDtoToReminder)
		};
	},
	target: outputs.$searchResults
});

reset({
	clock: inputs.resetQuery,
	target: [outputs.$query, outputs.$searchResults]
});

reset({
	clock: internals.resetIsTyping,
	target: internals.$isTyping
});
