import { sample } from 'effector';
import { inputs, internals } from './model';
import { taskEntity } from '&entities/task';
import { timeService } from '&shared/services/time';
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
			task: mapFormValueToDto(formValues),
			customerId: user!.uid
		};
	},
	target: internals.createNewTaskFx
});

sample({
	clock: internals.createNewTaskFx.done,
	source: {
		selectedDateStartTimestamp: timeService.outputs.$currentAppDateStart
	},
	fn: ({ selectedDateStartTimestamp }, { result }) => {
		return {
			task: mapDtoToTask(result),
			targetDateStartTimestamp: selectedDateStartTimestamp
		};
	},
	target: taskEntity.inputs.addTask
});
