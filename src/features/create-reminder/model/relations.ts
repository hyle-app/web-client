import { sample } from 'effector';
import { inputs, internals, outputs } from './model';
import { mapDtoToReminder, mapFormValuesToDTO } from './mappers';
import { reminderEntity } from '&entities/reminder';

sample({
	clock: inputs.createNewReminder,
	fn: (formValues) => {
		return { reminder: mapFormValuesToDTO(formValues) };
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
