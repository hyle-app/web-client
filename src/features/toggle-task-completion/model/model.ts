import { TaskId } from '&entities/task';
import { createEffect, createEvent } from 'effector';
import { ToggleSubtaskParams } from './types';
import { toggleTaskCompletionApi } from '../api';

const toggleTask = createEvent<TaskId>();
const toggleSubtask = createEvent<ToggleSubtaskParams>();

const changeTaskCompletionFx = createEffect(toggleTaskCompletionApi.changeTaskCompletion);
const changeSubtaskCompletionFx = createEffect(toggleTaskCompletionApi.changeSubtaskCompletion);

export const internals = {
	changeTaskCompletionFx,
	changeSubtaskCompletionFx
};
export const inputs = {
	toggleTask,
	toggleSubtask
};
