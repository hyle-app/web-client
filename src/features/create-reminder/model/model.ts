import { Reminder, ReminderFormValues } from '&entities/reminder/model';
import { createEffect, createEvent } from 'effector';
import { createReminderApi } from '../api';

const createNewReminder = createEvent<ReminderFormValues>();
const reminderCreated = createEvent<Reminder>();

const createReminderFx = createEffect(createReminderApi.createReminder);

export const inputs = { createNewReminder };
export const outputs = { reminderCreated };
export const internals = { createReminderFx };
