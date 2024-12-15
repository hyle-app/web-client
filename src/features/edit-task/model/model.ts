import { taskEntity, type Task } from '&entities/task';
import { getApplicationScope } from '&shared/utils';
import { createEffect, createEvent } from 'effector';
import { EditTaskFxParams } from './types';

const applyEditTask = createEvent<EditTaskFxParams>();

const editTaskFx = createEffect(({ taskId, formValues }: EditTaskFxParams): Task => {
	// TODO: Add real api call here
	const currentTaskState = getApplicationScope()
		.getState(taskEntity.outputs.$tasksList)
		.find((task) => task.id === taskId)!;

	return {
		id: taskId,
		title: formValues.title,
		createdAt: currentTaskState.createdAt,
		completedAt: currentTaskState?.completedAt,
		targetCompletionDateRange: [
			formValues.expirationDateRange.at(0)!.getTime(),
			formValues.expirationDateRange.at(1)?.getTime() ?? null
		],
		description: formValues.description,
		subtasks: formValues.subtasks,
		remindAt: formValues.reminderTime,
		linkedGoalId: formValues.linkedGoalId
	};
});

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
