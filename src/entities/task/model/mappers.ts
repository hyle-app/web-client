import { TaskDTO } from '../api';
import { Task } from './types';

export function mapDtoToTask(dto: TaskDTO): Task {
	return {
		id: dto.taskId,
		title: dto.title,
		createdAt: dto.createdAt,
		completedAt: dto.completedAt,
		targetCompletionDateRange: dto.taskCompletionDateRange ?? [0, null],
		description: dto.description ?? null,
		subtasks: dto.subtasks.map((subtask, id) => ({
			id: String(subtask.id || id),
			title: subtask.title,
			isCompleted: subtask.completed
		})),
		remindAt: dto.remindAt ?? null,
		linkedGoalId: String(dto.linkedGoal?.id) ?? null
	};
}
