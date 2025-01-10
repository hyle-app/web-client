import { timeService } from '&shared/services/time';
import { combine, createEffect, createEvent, createStore } from 'effector';
import { DeleteHabitPayload, Habit, HabitId, UpdateHabitPayload } from './types';
import { isHabitAttachedToDate } from './lib';
import { habitApi } from '../api';
import { once } from 'patronum';

const $habitsList = createStore<Habit[]>([]);
const fetchHabitsOfDay = createEvent<number>();
const addHabit = createEvent<Habit>();
const deleteHabit = createEvent<DeleteHabitPayload>();
const updateHabit = createEvent<UpdateHabitPayload>();
const resetHabitsList = createEvent();

const fetchHabitsOfDayFx = createEffect(habitApi.fetchHabitsOfDay);
const deleteHabitFx = createEffect(habitApi.deleteHabit);

const $currentAppDateHabits = combine(
	{ habitsList: $habitsList, currentAppDateStart: timeService.outputs.$currentAppDateStart },
	({ currentAppDateStart, habitsList }) => {
		return habitsList.filter((habit) => isHabitAttachedToDate(habit, currentAppDateStart));
	}
);

const getHabitById = (id: HabitId) => $habitsList.map((habits) => habits.find((habit) => habit.id === id) ?? null);

const initialHabitsFetched = once(fetchHabitsOfDayFx.doneData);

export const inputs = {
	updateHabit,
	addHabit,
	deleteHabit,
	fetchHabitsOfDay,
	resetHabitsList
};
export const outputs = { $currentAppDateHabits, $habitsList, getHabitById, initialHabitsFetched };

export const internals = { fetchHabitsOfDayFx, deleteHabitFx };
