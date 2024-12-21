import { type HabitFormValues } from '&entities/habit';
import { createEffect, createEvent } from 'effector';
import { createHabitApi } from '../api';

const habitCreated = createEvent();
const createNewHabit = createEvent<HabitFormValues>();

const createNewHabitFx = createEffect(createHabitApi.createHabit);

const $isCreatingHabit = createNewHabitFx.pending;

export const outputs = { habitCreated, $isCreatingHabit };
export const inputs = { createNewHabit };
export const internals = { createNewHabitFx };
