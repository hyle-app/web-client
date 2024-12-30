import { createEffect, createEvent } from 'effector';
import { CompleteSimpleGoalPayload, FillComplexGoalProgressPayload } from './types';
import { completeGoalApi } from '../api';

const fillComplexGoalProgress = createEvent<FillComplexGoalProgressPayload>();
const completeSimpleGoal = createEvent<CompleteSimpleGoalPayload>();

const updateGoalCompletionFx = createEffect(completeGoalApi.updateGoalCompletion);

const $isGoalCompletionInProgress = updateGoalCompletionFx.pending;

export const inputs = {
	fillComplexGoalProgress,
	completeSimpleGoal
};
export const outputs = {
	updateGoalCompletionFx,
	$isGoalCompletionInProgress
};
export const internals = {
	updateGoalCompletionFx
};
