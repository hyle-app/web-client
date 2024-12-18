import { SubtaskId, TaskId } from '&entities/task';

export type ToggleSubtaskParams = {
	taskId: TaskId;
	subtaskId: SubtaskId;
};
