import { sample } from 'effector';
import { inputs, internals } from './model';
import { taskEntity } from '&entities/task';
import { mapDtoToTask, mapFormValueToDto } from './mappers';
import { authService } from '&shared/services/auth';

sample({
	clock: inputs.createNewTask,
	source: {
		user: authService.outputs.$user
	},
	filter: authService.outputs.$isLoggedIn,
	fn: ({ user }, formValues) => {
		return {
			task: mapFormValueToDto({ ...formValues }, user!.uid),
			customerId: user!.uid
		};
	},
	target: internals.createNewTaskFx
});

sample({
	clock: internals.createNewTaskFx.done,
	fn: ({ result, params }) => {
		return {
			task: mapDtoToTask(result),
			targetDateStartTimestamp: params.task.taskCompletionDateRange.at(0)!
		};
	},
	target: taskEntity.inputs.addTask
});
