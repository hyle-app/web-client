import { sample } from 'effector';
import { inputs, internals, outputs } from './model';

sample({
	clock: inputs.setSideMenuOpen,
	target: internals.setSideMenuOpenFx
});

sample({
	clock: internals.setSideMenuOpenFx.doneData,
	target: outputs.$isSideMenuOpen
});
