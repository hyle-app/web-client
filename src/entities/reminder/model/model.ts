import { combine, createEffect, createEvent, createStore } from 'effector';
import { Reminder, ReminderId, UpdateReminderPayload } from './types';
import { timeService } from '&shared/services/time';
import { DeleteReminderParams } from '../api/types';
import { lib } from './lib';
import { reminderApi } from '../api';
import { once } from 'patronum';

const fetchRemindersOfDay = createEvent<number>();

const addReminder = createEvent<Reminder>();
const deleteReminder = createEvent<DeleteReminderParams>();
const updateReminder = createEvent<UpdateReminderPayload>();
const resetReminderList = createEvent();

const $remindersList = createStore<Reminder[]>([]);

const $currentAppDateReminders = combine(
	{ remindersList: $remindersList, currentAppDateStart: timeService.outputs.$currentAppDateStart },
	({ currentAppDateStart, remindersList }) => {
		return remindersList
			.filter((reminder) =>
				lib.isReminderAttachedToDay(reminder, timeService.lib.getCurrentTimestamp(), currentAppDateStart)
			)
			.sort((a, b) => {
				const is_a_overdue =
					lib.getOverdueDetailsOnDate(a, currentAppDateStart, timeService.lib.getCurrentTimestamp()) !== null ? 0 : 1;
				const is_b_overdue =
					lib.getOverdueDetailsOnDate(b, currentAppDateStart, timeService.lib.getCurrentTimestamp()) !== null ? 0 : 1;
				return is_a_overdue - is_b_overdue;
			});
	}
);

const getReminderById = (reminderId: ReminderId) =>
	$remindersList.map((remindersList) => remindersList.find((r) => r.id === reminderId) ?? null);

const fetchRemindersOfDayFx = createEffect(reminderApi.fetchRemindersOfDay);
const deleteReminderFx = createEffect(reminderApi.deleteReminder);

export const initialRemindersFetched = once(fetchRemindersOfDayFx.doneData);

export const inputs = {
	addReminder,
	deleteReminder,
	updateReminder,
	fetchRemindersOfDay,
	resetReminderList
};
export const outputs = { $remindersList, $currentAppDateReminders, getReminderById, initialRemindersFetched };
export const internals = { fetchRemindersOfDayFx, deleteReminderFx };
