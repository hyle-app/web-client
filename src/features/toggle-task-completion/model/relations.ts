import { taskEntity } from '&entities/task';
import { timeService } from '&shared/services/time';
import { sample } from 'effector';
import { inputs, internals } from './model';
import { mapTaskToDTO } from './mappers';
import { spread } from 'patronum';
import { authService } from '&shared/services/auth';

sample({
	clock: inputs.toggleTask,
	source: {
		tasksList: taskEntity.outputs.$tasksList,
		timestamp: timeService.outputs.$realTimestamp,
		user: authService.outputs.$user,
		isLoggedIn: authService.outputs.$isLoggedIn
	},
	filter: ({ tasksList, isLoggedIn }, taskId) => {
		const task = tasksList.find((t) => t.id === taskId);
		return task !== undefined && isLoggedIn;
	},
	fn: ({ tasksList, timestamp, user }, taskId) => {
		const task = tasksList.find((t) => t.id === taskId)!;

		if (taskEntity.lib.isTaskCompleted(task)) {
			const updatesTaskState = taskEntity.lib.uncompleteTask(task);
			return {
				local: { task: updatesTaskState },
				remote: { task: mapTaskToDTO(updatesTaskState), customerId: user!.uid }
			};
		}

		const updatedTaskState = taskEntity.lib.completeTask(task, timestamp);
		return {
			local: { task: updatedTaskState },
			remote: { task: mapTaskToDTO(updatedTaskState), customerId: user!.uid }
		};
	},
	target: spread({
		local: taskEntity.inputs.updateTask,
		remote: internals.changeTaskCompletionFx
	})
});

sample({
	clock: inputs.toggleSubtask,
	source: {
		tasksList: taskEntity.outputs.$tasksList,
		user: authService.outputs.$user,
		isLoggedIn: authService.outputs.$isLoggedIn
	},
	filter: ({ tasksList, isLoggedIn }, { taskId }) => {
		const task = tasksList.find((t) => t.id === taskId);
		return task !== undefined && isLoggedIn;
	},
	fn: ({ tasksList, user }, { taskId, subtaskId }) => {
		const task = tasksList.find((t) => t.id === taskId)!;

		if (taskEntity.lib.isSubtaskCompleted(task, subtaskId)) {
			const updatedTaskState = taskEntity.lib.uncompleteSubtask(task, subtaskId);
			return {
				local: { task: updatedTaskState },
				remote: { task: mapTaskToDTO(updatedTaskState), customerId: user!.uid }
			};
		}

		const updatedTaskState = taskEntity.lib.completeSubtask(task, subtaskId);
		return {
			local: { task: updatedTaskState },
			remote: { task: mapTaskToDTO(updatedTaskState), customerId: user!.uid }
		};
	},
	target: spread({
		local: taskEntity.inputs.updateTask,
		remote: internals.changeSubtaskCompletionFx
	})
});
