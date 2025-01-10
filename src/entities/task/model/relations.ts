import { sample } from 'effector';
import { inputs, internals } from './model';
import { authService } from '&shared/services/auth';
import { mapDtoToTask } from './mappers';
import { isTaskAttachedToDay } from './lib';
import { timeService } from '&shared/services/time';
import { reset } from 'patronum';

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
	source: { datedTasksList: internals.$datedTasksList, currentTimestamp: timeService.outputs.$realTimestamp },
	fn: ({ datedTasksList, currentTimestamp }, { params, result }) => {
		const newTasksList = result
			.map((task) => ({ ...mapDtoToTask(task), __DATE_TIMESTAMP__: params.dateTimestamp }))
			// NOTE: Only persist tasks that are related to day they were fetched to
			.filter((task) => isTaskAttachedToDay(task, params.dateTimestamp, currentTimestamp));
		const ids = newTasksList.map((task) => task.id);

		return [...datedTasksList.filter((task) => !ids.includes(task.id)), ...newTasksList];
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

sample({
	clock: inputs.deleteTask,
	source: { user: authService.outputs.$user },
	filter: authService.outputs.$isLoggedIn,
	fn: ({ user }, { taskId }) => ({ taskId, customerId: user!.uid }),
	target: internals.deleteTaskFx
});

reset({
	clock: inputs.resetTasksList,
	target: internals.$datedTasksList
});
