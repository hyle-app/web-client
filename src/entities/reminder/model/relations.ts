import { sample } from 'effector';
import { inputs, internals, outputs } from './model';
import { authService } from '&shared/services/auth';
import { mapDtoToReminder } from './mappers';
import { reset } from 'patronum';

sample({
	clock: inputs.fetchRemindersOfDay,
	source: {
		user: authService.outputs.$user
	},
	filter: authService.outputs.$isLoggedIn,
	fn: ({ user }, dayTimestamp) => ({ dateTimestamp: dayTimestamp, customerId: user!.uid }),
	target: internals.fetchRemindersOfDayFx
});

sample({
	clock: internals.fetchRemindersOfDayFx.doneData,
	source: {
		remindersList: outputs.$remindersList
	},
	fn: ({ remindersList }, reminders) => {
		const newReminders = reminders.map(mapDtoToReminder);
		const ids = newReminders.map((reminder) => reminder.id);
		return [...remindersList.filter((reminder) => !ids.includes(reminder.id)), ...newReminders];
	},
	target: outputs.$remindersList
});

sample({
	clock: inputs.addReminder,
	source: {
		remindersList: outputs.$remindersList
	},
	fn: ({ remindersList }, reminder) => [...remindersList, reminder],
	target: outputs.$remindersList
});

sample({
	clock: inputs.deleteReminder,
	source: {
		remindersList: outputs.$remindersList
	},
	fn: ({ remindersList }, { reminderId }) => remindersList.filter((reminder) => reminder.id !== reminderId),
	target: outputs.$remindersList
});

sample({
	clock: inputs.deleteReminder,
	target: internals.deleteReminderFx
});

sample({
	clock: inputs.updateReminder,
	source: {
		remindersList: outputs.$remindersList
	},
	fn: ({ remindersList }, { reminderId, reminder }) => {
		return remindersList.map((r) => (r.id === reminderId ? reminder : r));
	},
	target: outputs.$remindersList
});

reset({
	clock: inputs.resetReminderList,
	target: outputs.$remindersList
});
