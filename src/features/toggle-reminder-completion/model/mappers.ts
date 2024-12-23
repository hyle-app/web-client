import { Reminder } from '&entities/reminder';
import { CompleteReminderDTO } from '../api';

export function mapReminderToCompleteReminderDTO(reminder: Reminder): CompleteReminderDTO {
	return {
		reminderId: reminder.id,
		completedAt: reminder.completedAt,
		completions: reminder.completions,
		expiresAt: reminder.targetDateTime
	};
}
