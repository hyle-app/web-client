import { reminderEntity, ReminderId } from '&entities/reminder';
import { routerService } from '&shared/services/router';
import { combine, createEvent, sample } from 'effector';

const selectedReminderIdStorage = routerService.outputs.createQueryParamStorage('selected_reminder_id');

const setSelectedReminderId = createEvent<ReminderId>();
const $selectedReminderId = combine(
	{ selectedReminderId: selectedReminderIdStorage.$value, knownReminders: reminderEntity.outputs.$remindersList },
	({ selectedReminderId: selectedReminderId, knownReminders: knownReminders }) => {
		if (!selectedReminderId) return null;

		const reminder = knownReminders.find((reminder) => reminder.id === selectedReminderId);
		if (!reminder) return null;

		return selectedReminderId;
	}
);
const resetSelectedReminderId = selectedReminderIdStorage.reset;

sample({
	clock: setSelectedReminderId,
	fn: (reminderId) => ({ value: reminderId }),
	target: selectedReminderIdStorage.set
});

// NOTE: This one is to prevent user getting invalid state on page reload in case server did not return selected reminder for any reason
sample({
	clock: reminderEntity.outputs.initialRemindersFetched,
	source: { selectedReminderId: $selectedReminderId, storageValue: selectedReminderIdStorage.$value },
	filter: ({ selectedReminderId, storageValue }) => selectedReminderId === null && storageValue !== null,
	fn: () => null as unknown as void,
	target: resetSelectedReminderId
});

export const inputs = {
	setSelectedReminderId: setSelectedReminderId,
	resetSelectedReminderId: resetSelectedReminderId
};
export const outputs = {
	$selectedReminderId: $selectedReminderId
};
