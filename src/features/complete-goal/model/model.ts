import { createEffect, createEvent } from 'effector';
import { CompleteSimpleGoalPayload, FillComplexGoalProgressPayload, GoalCompletionChangedPayload } from './types';
import { completeGoalApi } from '../api';

const fillComplexGoalProgress = createEvent<FillComplexGoalProgressPayload>();
const completeSimpleGoal = createEvent<CompleteSimpleGoalPayload>();

const updateGoalCompletionFx = createEffect(completeGoalApi.updateGoalCompletion);

const $isGoalCompletionInProgress = updateGoalCompletionFx.pending;

const goalCompletionChanged = createEvent<GoalCompletionChangedPayload>();

export const inputs = {
	fillComplexGoalProgress,
	completeSimpleGoal
};
export const outputs = {
	updateGoalCompletionFx,
	$isGoalCompletionInProgress,
	goalCompletionChanged
};
export const internals = {
	updateGoalCompletionFx
};
