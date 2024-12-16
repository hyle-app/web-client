import { sample } from 'effector';
import { inputs, internals, outputs } from './model';
import { taskEntity } from '&entities/task';
import { authService } from '&shared/services/auth';
import { spread } from 'patronum';
import { mapTaskToDTO } from './mappers';

sample({
	clock: inputs.applyEditTask,
	source: {
		tasksList: taskEntity.outputs.$tasksList,
		user: authService.outputs.$user
	},
	filter: authService.outputs.$isLoggedIn,
	fn: ({ tasksList, user }, { taskId, formValues }) => {
		const task = tasksList.find((t) => t.id === taskId);
		if (!task) throw new Error(`Task with id ${taskId} not found`);

		const newTaskState = taskEntity.lib.updateTaskWithFormValues(task, formValues);
		return {
			remote: {
				customerId: user!.uid,
				task: mapTaskToDTO(newTaskState)
			},
			local: { task: newTaskState }
		};
	},
	target: spread({
		remote: internals.editTaskFx,
		local: taskEntity.inputs.updateTask
	})
});

sample({
	clock: internals.editTaskFx.doneData,
	target: outputs.taskEdited
});
