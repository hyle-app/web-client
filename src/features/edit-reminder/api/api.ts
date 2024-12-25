import { httpService } from '&shared/services/http';
import { CompleteReminderParams, EditReminderParams } from './types';

async function editReminder({ reminder, reminderId }: EditReminderParams) {
	await httpService.lib.patch(`/v1/reminders/${reminderId}`, reminder);
}

async function completeReminder({ reminder, reminderId }: CompleteReminderParams) {
	await httpService.lib.patch(`/v1/reminders/${reminderId}`, reminder);
}

export const editReminderApi = { editReminder, completeReminder };
