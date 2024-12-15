import { sample } from 'effector';
import { inputs } from './model';
import { taskEntity } from '&entities/task';
import { timeService } from '&shared/services/time';

sample({
	clock: inputs.toggleTask,
	source: {
		tasksList: taskEntity.outputs.$tasksList,
		timestamp: timeService.outputs.$realTimestamp
	},
	filter: ({ tasksList }, taskId) => {
		const task = tasksList.find((t) => t.id === taskId);
		return task !== undefined;
	},
	fn: ({ tasksList, timestamp }, taskId) => {
		const task = tasksList.find((t) => t.id === taskId)!;

		if (taskEntity.lib.isTaskCompleted(task)) {
			return { task: taskEntity.lib.uncompleteTask(task) };
		}

		return { task: taskEntity.lib.completeTask(task, timestamp) };
	},
	target: taskEntity.inputs.updateTask
});

sample({
	clock: inputs.toggleSubtask,
	source: {
		tasksList: taskEntity.outputs.$tasksList
	},
	filter: ({ tasksList }, { taskId }) => {
		const task = tasksList.find((t) => t.id === taskId);
		return task !== undefined;
	},
	fn: ({ tasksList }, { taskId, subtaskId }) => {
		const task = tasksList.find((t) => t.id === taskId)!;

		if (taskEntity.lib.isSubtaskCompleted(task, subtaskId)) {
			return { task: taskEntity.lib.uncompleteSubtask(task, subtaskId) };
		}

		return { task: taskEntity.lib.completeSubtask(task, subtaskId) };
	},
	target: taskEntity.inputs.updateTask
});
