import { sample } from 'effector';
import { inputs, internals } from './model';

sample({
	clock: inputs.deleteAccount,
	target: internals.deleteAccountFx
});
