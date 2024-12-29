import { sample } from 'effector';
import { inputs, internals } from './model';
import { lib } from './lib';

sample({
	clock: inputs.changeCurrentAppDate,
	filter: (date: number) => date !== lib.getStartOfTheDay(lib.getCurrentTimestamp()),
	fn: (date) => ({ value: lib.getStartOfTheDay(date).toString() }),
	target: internals.appDateStorage.set
});

sample({
	clock: inputs.changeCurrentAppDate,
	filter: (date: number) => date === lib.getStartOfTheDay(lib.getCurrentTimestamp()),
	fn: () => undefined,
	target: internals.appDateStorage.reset
});
