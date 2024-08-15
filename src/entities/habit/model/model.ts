import { timeService } from '&shared/services/time';
import { combine, createStore } from 'effector';
import { getMockHabits } from './__mocks__';
import { Habit } from './types';

const $habitsByDays = createStore<Record<number, Habit[]>>({
	[timeService.lib.getStartOfTheDay(timeService.lib.getCurrentTimestamp())]: getMockHabits()
});

const $currentAppDateHabits = combine(
	{ habitsByDays: $habitsByDays, currentAppDateStart: timeService.outputs.$currentAppDateStart },
	({ currentAppDateStart, habitsByDays }) => {
		return habitsByDays[currentAppDateStart] ?? [];
	}
);

export const inputs = {};
export const outputs = { $habitsByDays, $currentAppDateHabits };
