import { TimeUnit, timeService } from '&shared/services/time';
import { TaskFormFieldName } from './constants';
import { SubtaskId, Task, TaskFormValues } from './types';

/**
 * Returns timestamp of the date when the task should be completed.
 * For simple tasks with exsact target date it returns this date.
 * For range tasks it returns the date `checkoutTimestamp` date if it's it the range, otherwise it returns the end of the range.
 */
export function getTaskTargetDate(task: Task, checkoutTimestamp: number): number {
	if (task.targetCompletionDateRange[1] === null) {
		return task.targetCompletionDateRange[0];
	}

	const isViewDateBeyondTargetRange =
		timeService.lib.getStartOfTheDay(task.targetCompletionDateRange[1]) <
		timeService.lib.getStartOfTheDay(checkoutTimestamp);

	if (isViewDateBeyondTargetRange) {
		return task.targetCompletionDateRange[1];
	}

	return checkoutTimestamp;
}

export function getOverdueDetails(
	task: Task,
	checkoutTimestamp: number
): {
	unit: TimeUnit;
	value: number;
} | null {
	if (task.completedAt !== null) {
		return null;
	}

	if (task.targetCompletionDateRange[1] === null) {
		if (checkoutTimestamp > task.targetCompletionDateRange[0]) {
			return timeService.lib.getDiffInTimeUnits(task.targetCompletionDateRange[0], checkoutTimestamp);
		}

		return null;
	}

	if (checkoutTimestamp > task.targetCompletionDateRange[1]) {
		return timeService.lib.getDiffInTimeUnits(task.targetCompletionDateRange[1], checkoutTimestamp);
	}

	return null;
}

export function completeTask(task: Task, timestamp: number): Task {
	return {
		...task,
		completedAt: timestamp,
		subtasks: task.subtasks.map((subtask) => ({ ...subtask, isCompleted: true }))
	};
}

export function uncompleteTask(task: Task): Task {
	return {
		...task,
		completedAt: null
	};
}

export function completeSubtask(task: Task, subtaskId: SubtaskId): Task {
	return {
		...task,
		subtasks: task.subtasks.map((subtask) => {
			if (subtask.id === subtaskId) return { ...subtask, isCompleted: true };
			return subtask;
		})
	};
}

export function uncompleteSubtask(task: Task, subtaskId: SubtaskId): Task {
	return {
		...task,
		subtasks: task.subtasks.map((subtask) => {
			if (subtask.id === subtaskId) return { ...subtask, isCompleted: false };
			return subtask;
		})
	};
}

export function isTaskCompleted(task: Task): boolean {
	return task.completedAt !== null;
}

export function isSubtaskCompleted(task: Task, subtaskId: SubtaskId): boolean {
	const subtask = task.subtasks.find((s) => s.id === subtaskId);
	if (subtask === undefined) {
		return false;
	}

	return subtask.isCompleted;
}

export function isTaskAttachedToDay(task: Task, dayTimestamp: number, realTimestamp: number): boolean {
	const targetCompletionDate = getTaskTargetDate(task, dayTimestamp);
	const realTimestampStart = timeService.lib.getStartOfTheDay(realTimestamp);

	if (targetCompletionDate === dayTimestamp) {
		return true;
	}

	if (
		isTaskCompleted(task) &&
		timeService.lib.getStartOfTheDay(task.completedAt!) === timeService.lib.getStartOfTheDay(dayTimestamp)
	) {
		return true;
	}

	console.log('task checking', task.title);
	if (!isTaskCompleted(task) && realTimestampStart === timeService.lib.getStartOfTheDay(dayTimestamp)) {
		return true;
	}

	return false;
}

export function updateTaskWithFormValues(task: Task, formValues: TaskFormValues): Task {
	return {
		...task,
		title: formValues[TaskFormFieldName.Title],
		description: formValues[TaskFormFieldName.Description],
		targetCompletionDateRange: [
			formValues[TaskFormFieldName.ExpirationDateRange][0].getTime(),
			formValues[TaskFormFieldName.ExpirationDateRange][1]?.getTime() ?? null
		],
		remindAt: formValues[TaskFormFieldName.ReminderTime],
		subtasks: formValues[TaskFormFieldName.Subtasks],
		linkedGoalId: formValues[TaskFormFieldName.LinkedGoalId]
	};
}
