import { combine, createEvent, createStore } from 'effector';
import { time } from 'patronum/time';
import { interval } from 'patronum/interval';
import { getCurrentTimestamp, getStartOfTheDay } from './lib';

const init = createEvent();

const { tick } = interval({
	start: init,
	timeout: 1000,
	leading: true
});

const changeCurrentAppDate = createEvent<number>();

const $currentAppDateStart = createStore<number>(getStartOfTheDay(getCurrentTimestamp()));
const $realTimestamp = time(tick);
const $isViewingToday = combine(
	{ currentAppDateStart: $currentAppDateStart, realTimestamp: $realTimestamp },
	({ currentAppDateStart, realTimestamp }) => {
		return getStartOfTheDay(realTimestamp) === currentAppDateStart;
	}
);

export const inputs = { init, changeCurrentAppDate };
export const outputs = {
	$currentAppDateStart,
	$realTimestamp,
	$isViewingToday
};
