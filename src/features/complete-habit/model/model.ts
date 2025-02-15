import { createEffect, createEvent } from 'effector';
import {
	CompleteComplexHabitPayload,
	CompleteSimpleHabitPayload,
	HabitCompletedOnDayPayload,
	HabitPartiallyCompletedOnDayPayload
} from './types';
import { completeHabitApi } from '../api';

const completeSimpleHabit = createEvent<CompleteSimpleHabitPayload>();
const fillComplexHabitDayProgress = createEvent<CompleteComplexHabitPayload>();

const completeHabitFx = createEffect(completeHabitApi.completeHabit);

const habitPartiallyCompletedOnDay = createEvent<HabitPartiallyCompletedOnDayPayload>();
const habitCompletedOnDay = createEvent<HabitCompletedOnDayPayload>();

export const inputs = {
	fillComplexHabitDayProgress,
	completeSimpleHabit
};
export const outputs = {
	habitCompletedOnDay,
	habitPartiallyCompletedOnDay
};

export const internals = {
	completeHabitFx
};
