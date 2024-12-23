import { ReminderId } from '&entities/reminder';
import { ReminderFormValues } from '&entities/reminder/model';

export type EditReminderPayload = {
	reminderId: ReminderId;
	formValues: ReminderFormValues;
};

export type CompleteReminderPayload = {
	reminderId: ReminderId;
};
