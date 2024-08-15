import { timeService } from '&shared/services/time';
import { HabitRepeatRule } from './constants';
import { Habit } from './types';

export function getRandomRepeatRuleSet(): HabitRepeatRule[] {
	const repeatRules = Object.values(HabitRepeatRule);
	const length = Math.floor(Math.random() * (repeatRules.length - 1)) + 1;

	return Array.from({ length }, () => null).reduce((acc, _) => {
		const randomIndex = Math.floor(Math.random() * repeatRules.length);
		const randomRule = repeatRules[randomIndex]!;

		if (acc.includes(randomRule)) {
			return acc;
		}

		acc.push(randomRule);

		return acc;
	}, [] as HabitRepeatRule[]);
}

export function getMockHabits(amount: number = 7): Habit[] {
	return Array.from({ length: amount }, (_, index) => ({
		id: index.toString(),
		title: `Habit ${index}`,

		createdAt: timeService.lib.getCurrentTimestamp(),
		completedAt: null,
		description: 'Some description for the habit',
		linkedGoalId: null,
		penalty: 1,
		repeatRule: getRandomRepeatRuleSet(),
		emoji: Math.random() > 0.5 ? '1f600' : null,
		remindAt: null,

		currentProgress: Math.floor(Math.random() * 22),
		targetProgress: 21,

		dailyProgressSnaphots: {
			[timeService.lib.getStartOfTheDay(timeService.lib.getCurrentTimestamp())]: Math.floor(Math.random() * 9)
		},
		dailyTargetProgressDetails: { targetProgress: Math.floor(Math.random() * 10), label: 'раз' },

		completions: []
	}));
}
