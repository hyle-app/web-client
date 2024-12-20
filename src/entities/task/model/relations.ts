import { sample } from 'effector';
import { inputs, internals } from './model';
import { authService } from '&shared/services/auth';
import { mapDtoToTask } from './mappers';
import { isTaskAttachedToDay } from './lib';

sample({
	clock: inputs.fetchTasksOfDay,
	source: {
		user: authService.outputs.$user
	},
	filter: authService.outputs.$isLoggedIn,
	fn: ({ user }, timestamp) => ({ dateTimestamp: timestamp, customerId: user!.uid }),
	target: internals.fetchTasksOfDayFx
});

sample({
	clock: internals.fetchTasksOfDayFx.done,
	source: { datedTasksList: internals.$datedTasksList },
	fn: ({ datedTasksList }, { params, result }) => {
		return [
			...datedTasksList,
			...result
				.map((task) => ({ ...mapDtoToTask(task), __DATE_TIMESTAMP__: params.dateTimestamp }))
				// NOTE: Only persist tasks that are related to day they were fetched to
				.filter((task) => isTaskAttachedToDay(task, params.dateTimestamp))
		];
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
	clock: internals.deleteTaskFx.done,
	source: { datedTasksList: internals.$datedTasksList },
	fn: ({ datedTasksList }, { params }) => {
		return datedTasksList.filter((task) => task.id !== params.taskId);
	},
	target: internals.$datedTasksList
});

sample({
	clock: inputs.deleteTask,
	source: { user: authService.outputs.$user },
	filter: authService.outputs.$isLoggedIn,
	fn: ({ user }, { taskId }) => ({ taskId, customerId: user!.uid }),
	target: internals.deleteTaskFx
});
