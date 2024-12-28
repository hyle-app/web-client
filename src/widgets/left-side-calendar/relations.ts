import { timeService } from '&shared/services/time';
import { sample } from 'effector';
import { internals } from './model';

// sample({
// 	clock: timeService.inputs.changeCurrentAppDate,
// 	fn: (payload) => ({ value: payload.toString() }),
// 	target: internals.appDateStorage.set
// });
