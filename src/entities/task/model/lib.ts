import { TimeUnit, timeService } from '&shared/services/time';
import { Task } from './types';

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
