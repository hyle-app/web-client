import { createEffect, createEvent, createStore } from 'effector';
import { SearchResults } from './types';
import { searchApi } from '../api';
import { or } from 'patronum';
import { routerService } from '&shared/services/router';

const $query = createStore('');
const $isTyping = createStore(false);
const $searchResults = createStore<SearchResults>({
	tasks: [],
	habits: [],
	reminders: []
});
const changeQuery = createEvent<string>();
const resetQuery = createEvent();
const setIsTyping = createEvent();
const resetIsTyping = createEvent();

const startSearchFx = createEffect(searchApi.search);

const $isSearchLoading = or(startSearchFx.pending, $isTyping);

const { set: setSelectedHabitId, reset: resetSelectedHabitId } =
	routerService.outputs.createQueryParamStorage('selected_habit_id');

const { set: setSelectedTaskId, reset: resetSelectedTaskId } =
	routerService.outputs.createQueryParamStorage('selected_task_id');

const { set: setSelectedReminderId, reset: resetSelectedReminderId } =
	routerService.outputs.createQueryParamStorage('selected_reminder_id');

export const inputs = {
	changeQuery,
	resetQuery,
	setSelectedHabitId,
	resetSelectedHabitId,
	setSelectedTaskId,
	resetSelectedTaskId,
	setSelectedReminderId,
	resetSelectedReminderId
};
export const outputs = {
	$query,
	$searchResults,
	$isSearchLoading
};
export const internals = {
	startSearchFx,
	$isTyping,
	setIsTyping,
	resetIsTyping
};
