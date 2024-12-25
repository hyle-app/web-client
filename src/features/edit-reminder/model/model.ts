import { createEffect, createEvent } from 'effector';
import { CompleteReminderPayload, EditReminderPayload } from './types';
import { editReminderApi } from '../api';

const editReminder = createEvent<EditReminderPayload>();
const completeReminder = createEvent<CompleteReminderPayload>();
const editReminderFx = createEffect(editReminderApi.editReminder);
const completeReminderFx = createEffect(editReminderApi.completeReminder);

const reminderEdited = createEvent();
const $isReminderEditing = editReminderFx.pending;

export const inputs = { editReminder, completeReminder };
export const outputs = { reminderEdited, $isReminderEditing };
export const internals = { editReminderFx, completeReminderFx };
