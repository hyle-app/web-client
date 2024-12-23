import { Reminder } from '&entities/reminder/model';
import { EditReminderDTO, CompleteReminderDTO } from '../api';

export function mapReminderToEditDTO(reminder: Reminder): EditReminderDTO {
	return {
		reminderId: reminder.id,
		title: reminder.title,
		expiresAt: reminder.targetDateTime,
		description: reminder.description || '',
		linkedGoal: reminder.linkedGoalId ? { id: reminder.linkedGoalId, title: '' } : null,
		rule: reminder.rule
	};
}

export function mapReminderToCompleteDTO(reminder: Reminder): CompleteReminderDTO {
	return {
		reminderId: reminder.id,
		completedAt: reminder.completedAt,
		completions: reminder.completions,
		expiresAt: reminder.targetDateTime
	};
}
