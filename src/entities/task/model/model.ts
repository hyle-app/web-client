import { combine, createEffect, createEvent, createStore } from 'effector';
import type {
	AddTaskParams,
	DatedTask,
	DeleteTaskParams,
	FetchTasksOfDayParams,
	Task,
	TaskId,
	UpdateTaskParams
} from './types';
import { timeService } from '&shared/services/time';
import { getMockTasks } from './__mocks__';

const $datedTasksList = createStore<DatedTask[]>([]);

const $tasksList = $datedTasksList.map<Task[]>((tasks) => tasks);

const fetchTasksOfDay = createEvent<number>();
const addTask = createEvent<AddTaskParams>();
const updateTask = createEvent<UpdateTaskParams>();
const deleteTask = createEvent<DeleteTaskParams>();

const fetchTasksOfDayFx = createEffect(async (_timestamp: FetchTasksOfDayParams) => {
	await new Promise((resolve) => setTimeout(resolve, 300));
	return getMockTasks();
});

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
		return tasksByDays[currentAppDateStart] ?? [];
	}
);

export const inputs = { fetchTasksOfDay, addTask, updateTask, deleteTask };
export const outputs = { $tasksByDays, $currentAppDateTasks, $isFetchingTasks, $tasksList, getTaskById };
export const internals = { fetchTasksOfDayFx, $datedTasksList };
