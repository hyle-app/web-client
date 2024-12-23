import { combine, createEffect, createEvent, createStore } from 'effector';
import { Reminder, ReminderId, UpdateReminderPayload } from './types';
import { timeService } from '&shared/services/time';
import { getMockReminders } from './__mocks__';
import { DeleteReminderParams } from '../api/types';
import { lib } from './lib';
import { reminderApi } from '../api';

const fetchRemindersOfDay = createEvent<number>();

const addReminder = createEvent<Reminder>();
const deleteReminder = createEvent<DeleteReminderParams>();
const updateReminder = createEvent<UpdateReminderPayload>();

const $remindersList = createStore<Reminder[]>(getMockReminders());

const $currentAppDateReminders = combine(
	{ remindersList: $remindersList, currentAppDateStart: timeService.outputs.$currentAppDateStart },
	({ currentAppDateStart, remindersList }) => {
		return remindersList.filter((reminder) =>
			lib.isReminderAttachedToDay(reminder, timeService.lib.getCurrentTimestamp(), currentAppDateStart)
		);
	}
);

const getReminderById = (reminderId: ReminderId) =>
	$remindersList.map((remindersList) => remindersList.find((r) => r.id === reminderId) ?? null);

const fetchRemindersOfDayFx = createEffect(reminderApi.fetchRemindersOfDay);
const deleteReminderFx = createEffect(reminderApi.deleteReminder);

export const inputs = {
	addReminder,
	deleteReminder,
	updateReminder,
	fetchRemindersOfDay
};
export const outputs = { $remindersList, $currentAppDateReminders, getReminderById };
export const internals = { fetchRemindersOfDayFx, deleteReminderFx };
