import { combine, createStore } from 'effector';
import { Reminder } from './types';
import { timeService } from '&shared/services/time';
import { getMockReminders } from './__mocks__';

const $remindersByDays = createStore<Record<number, Reminder[]>>({
	[timeService.lib.getStartOfTheDay(timeService.lib.getCurrentTimestamp())]: getMockReminders()
});

const $currentAppDateReminders = combine(
	{ remindersByDays: $remindersByDays, currentAppDateStart: timeService.outputs.$currentAppDateStart },
	({ currentAppDateStart, remindersByDays }) => {
		return remindersByDays[currentAppDateStart] ?? [];
	}
);

export const inputs = {};
export const outputs = { $remindersByDays, $currentAppDateReminders };
