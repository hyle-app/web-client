import { Habit } from '&entities/habit';
import { HabitRepeatRule } from '&entities/habit/model/constants';
import { Reminder, ReminderRepeatRule } from '&entities/reminder';
import { Task } from '&entities/task';

import { HabitDTO, ReminderDTO, TaskDTO } from '../api';

export function mapDtoToTask(dto: TaskDTO): Task {
	const targetCompletionDateRange: [number, null | number] = [0, null];

	if (
		dto.taskCompletionDateRange &&
		dto.taskCompletionDateRange[0] &&
		dto.taskCompletionDateRange[1] &&
		dto.taskCompletionDateRange[0] !== dto.taskCompletionDateRange[1]
	) {
		targetCompletionDateRange[0] = dto.taskCompletionDateRange[0];
		targetCompletionDateRange[1] = dto.taskCompletionDateRange[1];
	}

	if (
		(dto.taskCompletionDateRange && dto.taskCompletionDateRange[0] && !dto.taskCompletionDateRange[1]) ||
		(dto.taskCompletionDateRange &&
			dto.taskCompletionDateRange[0] &&
			dto.taskCompletionDateRange[0] === dto.taskCompletionDateRange[1])
	) {
		targetCompletionDateRange[0] = dto.taskCompletionDateRange[0];
		targetCompletionDateRange[1] = null;
	}

	return {
		id: dto.taskId.toString(),
		title: dto.title,
		createdAt: dto.createdAt,
		completedAt: dto.completedAt,
		targetCompletionDateRange,
		description: dto.description ?? null,
		subtasks:
			dto.subtasks?.map((subtask, id) => ({
				id: String(subtask.id || id),
				title: subtask.title,
				isCompleted: subtask.completed
			})) ?? [],
		remindAt: dto.remindAt ?? null,
		linkedGoalId: String(dto.linkedGoal?.id) ?? null
	};
}

export function mapDtoToReminder(dto: ReminderDTO): Reminder {
	const linkedGoalId = dto.linkedGoal?.id ?? null;
	return {
		id: dto.reminderId.toString(),
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

export function mapDtoToHabit(dto: HabitDTO): Habit {
	return {
		id: dto.habitId.toString(),
		title: dto.title ?? '',
		createdAt: dto.createdAt,
		completedAt: dto.completedAt ?? null,
		description: dto.description || null,
		linkedGoalId: dto.linkedGoal?.id && dto.linkedGoal?.id > 0 ? dto.linkedGoal.id.toString() : null,
		penalty: dto.penalty,
		repeatRule: (dto.rule as HabitRepeatRule[]) || [],
		emoji: dto.emoji || null,
		remindAt: dto.remindAt ?? null,
		currentProgress: dto.progress ?? 0,
		targetProgress: dto.progressMax,
		dailyProgressSnaphots: dto.progressedSteps ?? {},
		dailyTargetProgressDetails:
			dto.steps?.count && Number(dto.steps.count) > 0
				? { targetProgress: Number(dto.steps.count), label: dto.steps.rate || null }
				: null,
		completions: dto.completions ?? []
	};
}
