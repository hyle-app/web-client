import { taskEntity } from '&entities/task';
import { authService } from '&shared/services/auth';
import { timeService } from '&shared/services/time';
import { sample } from 'effector';
import { mapDtoToTask, mapFormValueToDto } from './mappers';
import { inputs, internals } from './model';

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
			targetDateStartTimestamp: timeService.lib.getStartOfTheDay(params.task.taskCompletionDateRange.at(0)!)
		};
	},
	target: taskEntity.inputs.addTask
});
