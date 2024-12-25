import { createEffect, createEvent } from 'effector';
import { ToggleReminderCompletionPayload } from './types';
import { toggleReminderCompletionApi } from '../api';

const toggleReminderCompletion = createEvent<ToggleReminderCompletionPayload>();

const changeReminderCompletionFx = createEffect(toggleReminderCompletionApi.changeReminderCompletion);

export const inputs = {
	toggleReminderCompletion
};
export const outputs = {};
export const internals = { changeReminderCompletionFx };
