import { httpService } from '&shared/services/http';
import { CompleteReminderParams } from './types';

async function changeReminderCompletion({ reminder, reminderId }: CompleteReminderParams) {
	await httpService.lib.patch(`/v1/reminders/${reminderId}`, reminder);
}

export const toggleReminderCompletionApi = { changeReminderCompletion };
