import { sample } from 'effector';
import { inputs, internals, outputs } from './model';
import { HttpConfigKind } from './constants';

sample({
	clock: inputs.init,
	target: internals.getHttpConfigKindFx
});

sample({
	clock: internals.getHttpConfigKindFx.doneData,
	target: [internals.$httpConfigKind, outputs.inited]
});

sample({
	clock: inputs.toggleHttpConfig,
	source: {
		type: outputs.$httpConfigKind
	},
	fn: ({ type }) => {
		if (type === HttpConfigKind.Prod) {
			return HttpConfigKind.Dev;
		}

		return HttpConfigKind.Prod;
	},
	target: [internals.setHttpConfigKindFx, outputs.$httpConfigKind]
});

sample({
	clock: internals.$httpConfig.updates,
	target: internals.setBaseUrlFx
});
