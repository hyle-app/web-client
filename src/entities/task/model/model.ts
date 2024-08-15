import { combine, createStore } from 'effector';
import { Task } from './types';
import { timeService } from '&shared/services/time';
import { getMockTasks } from './__mocks__';

const $tasksByDays = createStore<Record<number, Task[]>>({
	[timeService.lib.getStartOfTheDay(timeService.lib.getCurrentTimestamp())]: getMockTasks()
});

const $currentAppDateTasks = combine(
	{ tasksByDays: $tasksByDays, currentAppDateStart: timeService.outputs.$currentAppDateStart },
	({ currentAppDateStart, tasksByDays }) => {
		return tasksByDays[currentAppDateStart] ?? [];
	}
);

export const inputs = {};
export const outputs = { $tasksByDays, $currentAppDateTasks };
