import { TaskDTO } from '../api';
import { Task } from './types';

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
