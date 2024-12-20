import { createEffect, createEvent } from 'effector';
import { CompleteComplexHabitPayload, CompleteSimpleHabitPayload } from './types';
import { completeHabitApi } from '../api';

const completeSimpleHabit = createEvent<CompleteSimpleHabitPayload>();
const fillComplexHabitDayProgress = createEvent<CompleteComplexHabitPayload>();

const completeHabitFx = createEffect(completeHabitApi.completeHabit);

export const inputs = {
	fillComplexHabitDayProgress,
	completeSimpleHabit
};
export const outputs = {};

export const internals = {
	completeHabitFx
};
