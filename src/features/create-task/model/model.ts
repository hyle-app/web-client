import type { TaskFormValues } from '&entities/task';
import { createEffect, createEvent } from 'effector';
import { createTaskApi } from '../api';

const createNewTask = createEvent<TaskFormValues>();

const createNewTaskFx = createEffect(createTaskApi.createTask);

const $isCreatingTask = createNewTaskFx.pending;

const taskCreated = createNewTaskFx.done.map(() => null as unknown as void);

export const inputs = {
	createNewTask
};
export const outputs = {
	$isCreatingTask,
	taskCreated
};
export const internals = {
	createNewTaskFx
};
