import { sample } from 'effector';
import { inputs, internals } from './model';
import { lib } from './lib';

sample({
	clock: inputs.changeCurrentAppDate,
	fn: (date) => ({ value: lib.getStartOfTheDay(date).toString() }),
	target: internals.appDateStorage.set
});
