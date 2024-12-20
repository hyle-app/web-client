import { timeService } from '&shared/services/time';
import { combine, createEffect, createEvent, createStore } from 'effector';
import { DeleteHabitPayload, Habit, HabitId, UpdateHabitPayload } from './types';
import { isHabitAttachedToDate } from './lib';
import { habitApi } from '../api';
import { debug } from 'patronum';

const $habitsList = createStore<Habit[]>([]);
const fetchHabitsOfDay = createEvent<number>();
const addHabit = createEvent<Habit>();
const deleteHabit = createEvent<DeleteHabitPayload>();
const updateHabit = createEvent<UpdateHabitPayload>();

const fetchHabitsOfDayFx = createEffect(habitApi.fetchHabitsOfDay);

debug($habitsList);

const $currentAppDateHabits = combine(
	{ habitsList: $habitsList, currentAppDateStart: timeService.outputs.$currentAppDateStart },
	({ currentAppDateStart, habitsList }) => {
		return habitsList.filter((habit) => isHabitAttachedToDate(habit, currentAppDateStart));
	}
);

const getHabitById = (id: HabitId) => $habitsList.map((habits) => habits.find((habit) => habit.id === id) ?? null);

export const inputs = {
	updateHabit,
	addHabit,
	deleteHabit,
	fetchHabitsOfDay
};
export const outputs = { $currentAppDateHabits, $habitsList, getHabitById };

export const internals = { fetchHabitsOfDayFx };
