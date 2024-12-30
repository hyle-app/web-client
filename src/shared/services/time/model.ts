import { combine, createEvent } from 'effector';
import { time } from 'patronum/time';
import { interval } from 'patronum/interval';
import { getCurrentTimestamp, getStartOfTheDay, lib } from './lib';
import { routerService } from '../router';

const init = createEvent();

const { tick } = interval({
	start: init,
	// Precision of 1 second is not important
	timeout: lib.MINUTE,
	leading: true
});

const changeCurrentAppDate = createEvent<number>();

const appDateStorage = routerService.outputs.createQueryParamStorage(
	'app_date',
	getStartOfTheDay(getCurrentTimestamp()).toString()
);

const $currentAppDateStart = appDateStorage.$value.map((timestampString: string | null) => {
	return parseInt(timestampString || getStartOfTheDay(getCurrentTimestamp()).toString(), 10);
});

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
export const internals = {
	appDateStorage
};
