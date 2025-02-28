import { sample } from 'effector';
import { inputs, internals, outputs } from './model';
import { reminderEntity } from '&entities/reminder';
import { timeService } from '&shared/services/time';
import { spread } from 'patronum';
import { mapReminderToCompleteDTO, mapReminderToEditDTO } from './mappers';

sample({
	clock: inputs.editReminder,
	source: {
		remindersList: reminderEntity.outputs.$remindersList
	},
	filter: ({ remindersList }, { reminderId }) => {
		const reminder = remindersList.find((r) => r.id === reminderId);
		return Boolean(reminder);
	},
	fn: ({ remindersList }, { reminderId, formValues }) => {
		const reminder = remindersList.find((r) => r.id === reminderId)!;
		const newReminderState = reminderEntity.lib.updateReminderWithFormValues(reminder, formValues);

		return {
			local: {
				reminderId,
				reminder: newReminderState
			},
			remote: {
				reminderId,
				reminder: mapReminderToEditDTO(newReminderState)
			}
		};
	},
	target: spread({ local: reminderEntity.inputs.updateReminder, remote: internals.editReminderFx })
});

sample({
	clock: internals.editReminderFx.done,
	target: outputs.reminderEdited
});

sample({
	clock: inputs.completeReminder,
	source: {
		remindersList: reminderEntity.outputs.$remindersList,
		timestamp: timeService.outputs.$realTimestamp
	},
	filter: ({ remindersList }, { reminderId }) => {
		const reminder = remindersList.find((r) => r.id === reminderId);
		return Boolean(reminder);
	},
	fn: ({ remindersList, timestamp }, { reminderId }) => {
		const reminder = remindersList.find((r) => r.id === reminderId)!;
		const newReminderState = reminderEntity.lib.completeReminderOnDate(reminder, timestamp);

		return {
			local: { reminderId, reminder: newReminderState },
			remote: { reminderId, reminder: mapReminderToCompleteDTO(newReminderState) }
		};
	},
	target: spread({
		local: reminderEntity.inputs.updateReminder,
		remote: internals.completeReminderFx
	})
});
