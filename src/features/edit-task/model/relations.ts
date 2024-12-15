import { sample } from 'effector';
import { inputs, internals, outputs } from './model';
import { taskEntity } from '&entities/task';

sample({
	clock: inputs.applyEditTask,
	target: internals.editTaskFx
});

sample({
	clock: internals.editTaskFx.doneData,
	fn: (task) => ({
		task
	}),
	target: taskEntity.inputs.updateTask
});

sample({
	clock: internals.editTaskFx.doneData,
	target: outputs.taskEdited
});
