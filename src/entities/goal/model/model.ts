import { createStore, combine, createEvent, createEffect } from 'effector';
import { timeService } from '&shared/services/time';

import type { DeleteGoalPayload, Goal, GoalId, LinkedEntities, UpdateGoalPayload } from './types';
import { goalApi } from '../api';
import { once } from 'patronum';

const $goalsAndAchievements = createStore<Goal[]>([]);
const fetchGoalsAndAchievements = createEvent();
const addGoal = createEvent<Goal>();
const deleteGoal = createEvent<DeleteGoalPayload>();
const updateGoal = createEvent<UpdateGoalPayload>();
const resetGoalsList = createEvent();

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

export const $nonOverdueGoals = combine(
	{
		goals: $goals,
		realTimestamp: timeService.outputs.$realTimestamp
	},
	({ goals, realTimestamp }) => goals.filter((goal) => goal.targetDate >= realTimestamp)
);

const getGoalOrAchievementById = (goalId: GoalId) =>
	$goalsAndAchievements.map((goalsAndAchievements) => goalsAndAchievements.find((goal) => goal.id === goalId) ?? null);

const initialGoalFetched = once(fetchGoalsAndAchievementsFx.done);

const $goalsAndAchiementsIds = $goalsAndAchievements.map((goals) => goals.map((goal) => goal.id));
const fetchGoalsLinkedEntitiesFx = createEffect(goalApi.fetchGoalsLinkedEntities);
const $linkedEntities = createStore<Record<GoalId, LinkedEntities>>({});
const getLinkedEntitiesOfGoal = (goalId: GoalId) =>
	$linkedEntities.map((linkedEntities) => linkedEntities[goalId] ?? null);

export const inputs = {
	fetchGoalsAndAchievements,
	updateGoal,
	addGoal,
	deleteGoal,
	resetGoalsList
};
export const outputs = {
	$goals,
	$achievements,
	$goalsAndAchievements,
	$overdueGoals,
	getGoalOrAchievementById,
	initialGoalFetched,
	$nonOverdueGoals,
	getLinkedEntitiesOfGoal,
	$linkedEntities
};

export const internals = {
	fetchGoalsAndAchievementsFx,
	deleteGoalFx,
	fetchGoalsLinkedEntitiesFx,
	$goalsAndAchiementsIds
};
