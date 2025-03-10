import {
	completeSubtask,
	completeTask,
	getOverdueDetails,
	getTaskTargetDate,
	inputs,
	isSubtaskCompleted,
	isTaskCompleted,
	outputs,
	uncompleteSubtask,
	uncompleteTask,
	updateTaskWithFormValues
} from './model';

export type { Subtask, SubtaskId, Task, TaskFormValues, TaskId } from './model';

export { CompletableSubtaskCard, CompletableTaskCard, SubtaskCard, TaskCard, TaskForm } from './ui';

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
