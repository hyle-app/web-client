import { sample } from 'effector';
import { inputs, internals, outputs } from './model';

sample({
	clock: inputs.getUserSubscription,
	target: internals.getUserSubscriptionFx
});

sample({
	clock: internals.getUserSubscriptionFx.doneData,
	target: outputs.$subscription
});
