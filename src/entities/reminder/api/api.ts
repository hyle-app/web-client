import { httpService } from '&shared/services/http';
import { DeleteReminderParams, FetchRemindersOfDayParams, ReminderDTO } from './types';

async function fetchRemindersOfDay({ dateTimestamp, customerId }: FetchRemindersOfDayParams): Promise<ReminderDTO[]> {
	const response = await httpService.lib.get<ReminderDTO[]>(
		`/v1/reminders?date=${dateTimestamp}&customerId=${customerId}`
	);

	return response.data;
}

async function deleteReminder({ reminderId }: DeleteReminderParams): Promise<void> {
	await httpService.lib.delete(`/reminders/${reminderId}`);
}

export const reminderApi = { fetchRemindersOfDay, deleteReminder };
