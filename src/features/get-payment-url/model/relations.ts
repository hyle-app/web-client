import { sample } from 'effector';
import { inputs, internals } from './model';

sample({
	clock: inputs.getPaymentUrl,
	target: internals.getPaymentUrlFx
});

sample({
	clock: internals.getPaymentUrlFx.doneData,
	fn: (data) => {
		if (data && data.formUrl) {
			window.open(data.formUrl, '_blank');
		}
	}
});
