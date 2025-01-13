import { sample } from 'effector';
import { inputs, internals, outputs } from './model';

sample({
	clock: inputs.getAllPurchases,
	target: internals.getPurchasesFx
});

sample({
	clock: internals.getPurchasesFx.doneData,
	target: outputs.$purchases
});
