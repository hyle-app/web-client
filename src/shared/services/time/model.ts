import { createEvent, createStore } from 'effector';
import { time } from 'patronum/time';
import { interval } from 'patronum/interval';
import { getCurrentTimestamp, getStartOfTheDay } from './lib';

const init = createEvent();

const { tick } = interval({
	start: init,
	timeout: 1000,
	leading: true
});

const $currentAppDateStart = createStore<number>(getStartOfTheDay(getCurrentTimestamp()));
const $realTimestamp = time(tick);

export const inputs = { init };
export const outputs = {
	$currentAppDateStart,
	$realTimestamp
};
