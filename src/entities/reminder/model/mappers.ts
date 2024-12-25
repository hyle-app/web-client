import { ReminderDTO } from '../api';
import { ReminderRepeatRule } from './constants';
import { Reminder } from './types';

export function mapDtoToReminder(dto: ReminderDTO): Reminder {
	const linkedGoalId = dto.linkedGoal?.id ?? null;
	return {
		id: dto.reminderId,
		title: dto.title,
		description: dto.description,
		linkedGoalId: linkedGoalId === null || linkedGoalId === 0 ? null : linkedGoalId.toString(),
		createdAt: dto.createdAt,
		targetDateTime: dto.expiresAt,
		completedAt: dto.completedAt ?? null,
		completions: dto.completions ?? [],
		expirations: dto.expirations ?? [],
		rule: dto.rule as ReminderRepeatRule
	};
}
