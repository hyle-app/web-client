import type { TaskId } from '&entities/task';
import { createEvent } from 'effector';
import type { ToggleSubtaskParams } from './types';

const toggleTask = createEvent<TaskId>();
const toggleSubtask = createEvent<ToggleSubtaskParams>();

export const outputs = {};
export const inputs = {
	toggleTask,
	toggleSubtask
};
