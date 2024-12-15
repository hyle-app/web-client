import type { Task, TaskFormValues } from '&entities/task';
import { generateTemporaryId } from '&shared/utils';
import { createEffect, createEvent } from 'effector';

const createNewTask = createEvent<TaskFormValues>();

const createNewTaskFx = createEffect((formValues: TaskFormValues): Task => {
	// TODO: Add real api call here

	return {
		id: generateTemporaryId(),
		title: formValues.title,
		createdAt: Date.now(),
		completedAt: null,
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
