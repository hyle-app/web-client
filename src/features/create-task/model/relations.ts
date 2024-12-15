import { sample } from 'effector';
import { inputs, internals } from './model';
import { taskEntity } from '&entities/task';
import { timeService } from '&shared/services/time';

sample({
	clock: inputs.createNewTask,
	target: internals.createNewTaskFx
});

sample({
	clock: internals.createNewTaskFx.done,
	source: {
		selectedDateStartTimestamp: timeService.outputs.$currentAppDateStart
	},
	fn: ({ selectedDateStartTimestamp }, { result }) => {
		return {
			task: result,
			targetDateStartTimestamp: selectedDateStartTimestamp
		};
	},
	target: taskEntity.inputs.addTask
});
