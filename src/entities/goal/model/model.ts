import { createStore, combine, createEvent, createEffect } from 'effector';
import { timeService } from '&shared/services/time';

import type { DeleteGoalPayload, Goal, UpdateGoalPayload } from './types';
import { goalApi } from '../api';

const $goalsAndAchievements = createStore<Goal[]>([]);
const fetchGoalsAndAchievements = createEvent();
const addGoal = createEvent<Goal>();
const deleteGoal = createEvent<DeleteGoalPayload>();
const updateGoal = createEvent<UpdateGoalPayload>();

const fetchGoalsAndAchievementsFx = createEffect(goalApi.fetchGoals);
const deleteGoalFx = createEffect(goalApi.deleteGoal);

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

export const inputs = {
	fetchGoalsAndAchievements,
	updateGoal,
	addGoal,
	deleteGoal
};
export const outputs = {
	$goals,
	$achievements,
	$goalsAndAchievements,
	$overdueGoals
};

export const internals = { fetchGoalsAndAchievementsFx, deleteGoalFx };
