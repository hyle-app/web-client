import { combine, createEffect, createEvent, createStore } from 'effector';
import type { AddTaskParams, DatedTask, DeleteTaskParams, Task, TaskId, UpdateTaskParams } from './types';
import { timeService } from '&shared/services/time';
import { taskApi } from '../api';
import { once } from 'patronum';
import { getOverdueDetails } from './lib';

const $datedTasksList = createStore<DatedTask[]>([]);

const $tasksList = $datedTasksList.map<Task[]>((tasks) => tasks);

const fetchTasksOfDay = createEvent<number>();
const addTask = createEvent<AddTaskParams>();
const updateTask = createEvent<UpdateTaskParams>();
const deleteTask = createEvent<DeleteTaskParams>();
const resetTasksList = createEvent();

const fetchTasksOfDayFx = createEffect(taskApi.fetchTasksOfDay);
const deleteTaskFx = createEffect(taskApi.deleteTask);

const $tasksByDays = $datedTasksList.map<Record<number, Task[]>>((tasks) => {
	return tasks.reduce(
		(acc, task) => {
			const date = task.__DATE_TIMESTAMP__;
			if (!acc[date]) {
				acc[date] = [];
			}
			acc[date].push(task);
			return acc;
		},
		{} as Record<number, Task[]>
	);
});

const getTaskById = (id: TaskId) => $tasksList.map((tasks) => tasks.find((task) => task.id === id) ?? null);

const $isFetchingTasks = fetchTasksOfDayFx.pending;

const $currentAppDateTasks = combine(
	{ tasksByDays: $tasksByDays, currentAppDateStart: timeService.outputs.$currentAppDateStart },
	({ currentAppDateStart, tasksByDays }) => {
		return (tasksByDays[currentAppDateStart] ?? []).sort((a, b) => {
			const is_a_overdue = getOverdueDetails(a, timeService.lib.getCurrentTimestamp()) !== null ? 0 : 1;
			const is_b_overdue = getOverdueDetails(b, timeService.lib.getCurrentTimestamp()) !== null ? 0 : 1;
			return is_a_overdue - is_b_overdue;
		});
	}
);

const initialTasksFetched = once(fetchTasksOfDayFx.doneData);

export const inputs = { fetchTasksOfDay, addTask, updateTask, deleteTask, resetTasksList };
export const outputs = {
	$tasksByDays,
	$currentAppDateTasks,
	$isFetchingTasks,
	$tasksList,
	getTaskById,
	initialTasksFetched
};
export const internals = { fetchTasksOfDayFx, $datedTasksList, deleteTaskFx };
