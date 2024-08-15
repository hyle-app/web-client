import { getOverdueDetails, getTaskTargetDate, inputs, outputs } from './model';

export type { TaskId, SubtaskId, Subtask, Task } from './model';

export { TaskCard, SubtaskCard } from './ui';

export const taskEntity = {
	inputs,
	outputs,
	lib: {
		getTaskTargetDate,
		getOverdueDetails
	}
};
