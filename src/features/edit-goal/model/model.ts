import { createEffect, createEvent } from 'effector';
import { editGoalApi } from '../api';
import { EditGoalPayload } from './types';

const editGoal = createEvent<EditGoalPayload>();

const editGoalFx = createEffect(editGoalApi.editGoal);

const isGoalEditing = editGoalFx.pending;

const goalEdited = createEvent();

export const inputs = { editGoal };
export const outputs = { goalEdited, isGoalEditing };
export const internals = { editGoalFx };
