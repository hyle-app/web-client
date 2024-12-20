import { createEffect, createEvent } from 'effector';
import { EditTaskFxParams } from './types';
import { editTaskApi } from '../api';

const applyEditTask = createEvent<EditTaskFxParams>();

const editTaskFx = createEffect(editTaskApi.editTask);

const $isEditingTask = editTaskFx.pending;

const taskEdited = createEvent();

export const inputs = {
	applyEditTask
};
export const outputs = {
	$isEditingTask,
	taskEdited
};
export const internals = {
	editTaskFx
};
