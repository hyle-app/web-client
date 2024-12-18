import { createEffect, createEvent, sample } from 'effector';
import { SetHeaderPayload } from './types';
import { AXIOS_INSTANCE } from './constants';

export const setHeader = createEvent<SetHeaderPayload>();
export const setHeaderFx = createEffect((payload: SetHeaderPayload) => {
	if (payload.value === null) {
		delete AXIOS_INSTANCE.defaults.headers.common[payload.key];
		return;
	}

	AXIOS_INSTANCE.defaults.headers.common[payload.key] = payload.value;
});

sample({
	clock: setHeader,
	target: setHeaderFx
});

export const inputs = {
	setHeader
};

export const internals = { setHeaderFx };
