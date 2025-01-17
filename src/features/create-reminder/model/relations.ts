import { sample } from 'effector';
import { inputs, internals, outputs } from './model';
import { mapDtoToReminder, mapFormValuesToDTO } from './mappers';
import { reminderEntity } from '&entities/reminder';
import { authService } from '&shared/services/auth';

sample({
	clock: inputs.createNewReminder,
	source: { user: authService.outputs.$user },
	fn: ({ user }, formValues) => {
		return { reminder: mapFormValuesToDTO(formValues, user!.uid) };
	},
	target: internals.createReminderFx
});

sample({
	clock: internals.createReminderFx.doneData,
	fn: (result) => {
		return mapDtoToReminder(result);
	},
	target: [reminderEntity.inputs.addReminder, outputs.reminderCreated]
});
