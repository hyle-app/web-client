import { timeService } from '&shared/services/time';
import { ReminderRepeatRule } from './constants';
import { Reminder } from './types';

function getRandomRepeatRule(): ReminderRepeatRule {
	const repeatRules = Object.values(ReminderRepeatRule);

	return repeatRules[Math.floor(Math.random() * repeatRules.length)]!;
}

export function getMockReminders(amount: number = 7): Reminder[] {
	return Array.from({ length: amount }, (_, index) => ({
		id: index.toString(),
		title: `Reminder ${index}`,
		createdAt: timeService.lib.getCurrentTimestamp(),
		targetDateTime: timeService.lib.getCurrentTimestamp() + timeService.lib.DAY * 4,
		completedAt: null,
		description: 'Some description for the reminder',
		linkedGoalId: null,

		completions: [],
		expirations: [],
		rule: getRandomRepeatRule()
	}));
}
