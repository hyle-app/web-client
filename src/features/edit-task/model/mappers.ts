import { Task } from '&entities/task';
import { TaskDTO } from '../api';

export function mapTaskToDTO(task: Task): TaskDTO {
	return {
		taskId: task.id,
		title: task.title,
		description: task.description ?? undefined,
		completedAt: task.completedAt,
		createdAt: task.createdAt,
		taskCompletionDateRange: [
			task.targetCompletionDateRange[0],
			task.targetCompletionDateRange[1] ?? task.targetCompletionDateRange[0]
		],
		subtasks: task.subtasks.map((subtask) => ({
			id: subtask.id,
			title: subtask.title,
			completed: subtask.isCompleted
		})),
		linkedGoal: task.linkedGoalId ? { id: task.linkedGoalId, title: '' } : null,
		remindAt: task.remindAt ?? undefined
	};
}
