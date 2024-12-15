import { sample } from 'effector';
import { inputs, internals } from './model';

sample({
	clock: inputs.fetchTasksOfDay,
	// TODO: Replace customer id with sourced store
	fn: (timestamp) => ({ dateTimestamp: timestamp, customerId: '1' }),
	target: internals.fetchTasksOfDayFx
});

sample({
	clock: internals.fetchTasksOfDayFx.done,
	source: { datedTasksList: internals.$datedTasksList },
	fn: ({ datedTasksList }, { params, result }) => {
		return [...datedTasksList, ...result.map((task) => ({ ...task, __DATE_TIMESTAMP__: params.dateTimestamp }))];
	},
	target: internals.$datedTasksList
});

sample({
	clock: inputs.addTask,
	source: { datedTasksList: internals.$datedTasksList },
	fn: ({ datedTasksList }, { task, targetDateStartTimestamp }) => {
		const newTask = { ...task, __DATE_TIMESTAMP__: targetDateStartTimestamp };
		return [...datedTasksList, newTask];
	},
	target: internals.$datedTasksList
});

sample({
	clock: inputs.updateTask,
	source: { datedTasksList: internals.$datedTasksList },
	fn: ({ datedTasksList }, { task }) => {
		const taskIndex = datedTasksList.findIndex((t) => t.id === task.id);
		if (taskIndex === -1) {
			return datedTasksList;
		}

		const newDatedTasksList = [...datedTasksList];

		newDatedTasksList[taskIndex] = {
			...task,
			__DATE_TIMESTAMP__: datedTasksList[taskIndex]!.__DATE_TIMESTAMP__
		};
		return newDatedTasksList;
	},
	target: internals.$datedTasksList
});

sample({
	clock: inputs.deleteTask,
	source: { datedTasksList: internals.$datedTasksList },
	fn: ({ datedTasksList }, { taskId }) => {
		return datedTasksList.filter((task) => task.id !== taskId);
	},
	target: internals.$datedTasksList
});
