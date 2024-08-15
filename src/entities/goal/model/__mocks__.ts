import { timeService } from '&shared/services/time';
import { BalanceCategory } from '&shared/constants';
import { ALLOWED_GOAL_WEIGHTS } from './constants';
import { Goal } from './types';

function getRandomGoalCategory(): BalanceCategory {
	const categories = Object.values(BalanceCategory);

	return categories[Math.floor(Math.random() * categories.length)]!;
}

function getRandomGoalWeight(): number {
	return ALLOWED_GOAL_WEIGHTS[Math.floor(Math.random() * ALLOWED_GOAL_WEIGHTS.length)]!;
}

export function getMockGoals(amount: number = 4): Goal[] {
	const currentTimestamp = timeService.lib.getCurrentTimestamp();

	return Array.from(Array(amount), (_, index: number) => {
		const isCompleted = Math.random() > 0.8;
		const targetProgress = Math.floor(1 + Math.random() * 3);
		return {
			id: index.toString(),
			title: 'Learn TypeScript',
			createdAt: currentTimestamp,
			targetDate: currentTimestamp + timeService.lib.DAY * 3 * (Math.random() > 0.5 ? 1 : -1),
			completedAt: isCompleted ? currentTimestamp - timeService.lib.DAY : null,
			description: 'Learn TypeScript basics and write a simple application with it to understand the basics.',
			emoji: Math.random() > 0.5 ? '1f600' : null,
			progress: {
				targetProgress,
				currentProgress: isCompleted ? targetProgress : Math.floor(Math.random() * targetProgress),
				label: ''
			},
			category: getRandomGoalCategory(),
			weight: getRandomGoalWeight()
		};
	});
}
