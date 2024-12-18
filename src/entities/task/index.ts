import {
	completeSubtask,
	completeTask,
	getOverdueDetails,
	getTaskTargetDate,
	inputs,
	isTaskCompleted,
	outputs,
	uncompleteSubtask,
	uncompleteTask,
	isSubtaskCompleted,
	updateTaskWithFormValues
} from './model';

export type { TaskId, SubtaskId, Subtask, Task, TaskFormValues } from './model';

export { TaskCard, CompletableSubtaskCard, SubtaskCard, TaskForm } from './ui';

export const taskEntity = {
	inputs,
	outputs,
	lib: {
		getTaskTargetDate,
		getOverdueDetails,
		completeTask,
		uncompleteTask,
		isTaskCompleted,
		completeSubtask,
		uncompleteSubtask,
		isSubtaskCompleted,
		updateTaskWithFormValues
	}
};
