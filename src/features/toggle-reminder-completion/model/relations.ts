import { sample } from 'effector';
import { inputs, internals } from './model';
import { reminderEntity } from '&entities/reminder';
import { timeService } from '&shared/services/time';
import { spread } from 'patronum';
import { mapReminderToCompleteReminderDTO } from './mappers';

sample({
	clock: inputs.toggleReminderCompletion,
	source: {
		remindersList: reminderEntity.outputs.$remindersList,
		currentTimestamp: timeService.outputs.$realTimestamp,
		isViewingToday: timeService.outputs.$isViewingToday
	},
	filter: ({ remindersList, isViewingToday }, { reminderId }) => {
		const reminder = remindersList.find((r) => r.id === reminderId);
		return Boolean(reminder) && isViewingToday;
	},
	fn: ({ currentTimestamp, remindersList }, { reminderId }) => {
		const reminder = remindersList.find((r) => r.id === reminderId)!;

		const isCompletedOnDate = reminderEntity.lib.isReminderCompletedOnDay(reminder, currentTimestamp);
		if (isCompletedOnDate) {
			const newReminderState = reminderEntity.lib.uncompleteReminderOnDate(reminder, currentTimestamp);
			return {
				local: { reminderId, reminder: newReminderState },
				remote: { reminderId, reminder: mapReminderToCompleteReminderDTO(newReminderState) }
			};
		}

		const newReminderState = reminderEntity.lib.completeReminderOnDate(reminder, currentTimestamp);
		return {
			local: { reminderId, reminder: newReminderState },
			remote: { reminderId, reminder: mapReminderToCompleteReminderDTO(newReminderState) }
		};
	},
	target: spread({
		local: reminderEntity.inputs.updateReminder,
		remote: internals.changeReminderCompletionFx
	})
});
