import { ReminderDTO } from '&entities/reminder/api';
import { httpService } from '&shared/services/http';
import { CreateReminderParams, DeleteReminderParams } from './types';

async function createReminder({ reminder }: CreateReminderParams): Promise<ReminderDTO> {
	const res = await httpService.lib.post<ReminderDTO>('/v1/reminders', reminder);

	return res.data;
}

async function deleteReminder({ reminderId }: DeleteReminderParams): Promise<ReminderDTO> {
	const res = await httpService.lib.post<ReminderDTO>(`/v1/reminders?reminderId=${reminderId}`);

	return res.data;
}

export const createReminderApi = {
	createReminder,
	deleteReminder
};
