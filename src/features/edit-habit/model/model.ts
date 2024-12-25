import { createEffect, createEvent } from 'effector';
import { editHabitApi } from '../api';
import { EditHabitPayload } from './types';

const editHabit = createEvent<EditHabitPayload>();

const editHabitFx = createEffect(editHabitApi.editHabit);

const $isEditingHabit = editHabitFx.pending;

const habitEdited = createEvent();

export const outputs = { $isEditingHabit, habitEdited };
export const inputs = { editHabit };
export const internals = { editHabitFx };
