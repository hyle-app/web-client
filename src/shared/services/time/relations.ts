import { sample } from 'effector';
import { inputs, outputs } from './model';
import { lib } from './lib';

sample({
	clock: inputs.changeCurrentAppDate,
	fn: (date) => lib.getStartOfTheDay(date),
	target: outputs.$currentAppDateStart
});
