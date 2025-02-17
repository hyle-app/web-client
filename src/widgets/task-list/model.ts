import { taskEntity, TaskId } from '&entities/task';
import { routerService } from '&shared/services/router';
import { combine, createEvent, sample } from 'effector';

const selectedTaskIdStorage = routerService.outputs.createQueryParamStorage('selected_task_id');

const setSelectedTaskId = createEvent<TaskId>();
const $selectedTaskId = combine(
	{ selectedTaskId: selectedTaskIdStorage.$value, knownTasks: taskEntity.outputs.$tasksList },
	({ selectedTaskId: selectedTaskId, knownTasks: knownTasks }) => {
		if (!selectedTaskId) return null;

		const task = knownTasks.find((task) => task.id === selectedTaskId);
		if (!task) return null;

		return selectedTaskId;
	}
);
const resetSelectedTaskId = selectedTaskIdStorage.reset;

sample({
	clock: setSelectedTaskId,
	fn: (taskId) => ({ value: taskId }),
	target: selectedTaskIdStorage.set
});

// NOTE: This one is to prevent user getting invalid state on page reload in case server did not return selected task for any reason
sample({
	clock: taskEntity.outputs.initialTasksFetched,
	source: { selectedTaskId: $selectedTaskId, storageValue: selectedTaskIdStorage.$value },
	filter: ({ selectedTaskId, storageValue }) => selectedTaskId === null && storageValue !== null,
	fn: () => null as unknown as void,
	target: resetSelectedTaskId
});

export const inputs = {
	setSelectedTaskId: setSelectedTaskId,
	resetSelectedTaskId: resetSelectedTaskId
};
export const outputs = {
	$selectedTaskId: $selectedTaskId
};
