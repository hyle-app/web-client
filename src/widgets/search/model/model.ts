import { createEffect, createEvent, createStore } from 'effector';
import { SearchResults } from './types';
import { searchApi } from '../api';
import { or } from 'patronum';

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

export const inputs = {
	changeQuery,
	resetQuery
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
