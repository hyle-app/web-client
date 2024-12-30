import { type Goal, type GoalFormValues } from '&entities/goal';
import { createEffect, createEvent } from 'effector';
import { createGoalApi } from '../api';

const createNewGoal = createEvent<GoalFormValues>();

const createGoalFx = createEffect(createGoalApi.createGoal);

const isGoalCreating = createGoalFx.pending;

const goalCreated = createEvent<Goal>();

export const inputs = { createNewGoal };
export const outputs = { goalCreated, isGoalCreating };
export const internals = { createGoalFx };
