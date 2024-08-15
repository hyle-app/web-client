import { createStore, combine } from 'effector';
import { timeService } from '&shared/services/time';

import type { Goal } from './types';
import { getMockGoals } from './__mocks__';

export const $goalsAndAchievements = createStore<Goal[]>(getMockGoals());

export const $goals = $goalsAndAchievements.map((goalsAndAchievements) =>
	goalsAndAchievements.filter((goal) => goal.completedAt === null)
);

export const $achievements = $goalsAndAchievements.map((goalsAndAchievements) =>
	goalsAndAchievements.filter((goal) => goal.completedAt !== null)
);

export const $overdueGoals = combine(
	{
		goals: $goals,
		realTimestamp: timeService.outputs.$realTimestamp
	},
	({ goals, realTimestamp }) => goals.filter((goal) => goal.targetDate < realTimestamp)
);

export const inputs = {};
export const outputs = {
	$goals,
	$achievements,
	$goalsAndAchievements,
	$overdueGoals
};
