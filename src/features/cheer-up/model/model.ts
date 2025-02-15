import { createEvent, createStore, sample } from 'effector';
import { Details } from './types';
import { reset } from 'patronum';

const $details = createStore<Details | null>(null);
const $isOpen = $details.map((details) => details !== null);

const showCheerupSidebar = createEvent<Details>();
const closeCheerupSidebar = createEvent();

sample({
	clock: showCheerupSidebar,
	target: $details
});

reset({
	clock: closeCheerupSidebar,
	target: $details
});

export const inputs = {
	showCheerupSidebar,
	closeCheerupSidebar
};
export const outputs = {};
export const internals = {
	$details,
	$isOpen
};
