import { Task } from '&entities/task';

import type { TaskDTO } from '../api';

export function mapTaskToDTO(task: Task): TaskDTO {
	return {
		taskId: task.id,
		completedAt: task.completedAt,
		subtasks: task.subtasks.map((subtask) => ({
			id: subtask.id,
			title: subtask.title,
			completed: subtask.isCompleted
		}))
	};
}
