import { createEffect, createEvent, createStore, sample } from 'effector';
import { HttpConfig, SetHeaderPayload } from './types';
import { AXIOS_INSTANCE, CONFIG_KIND_KEY, CONFIG_KIND_MAP, HttpConfigKind } from './constants';
import { getUrlFromConfig } from './lib';

export const $httpConfigKind = createStore<HttpConfigKind>(HttpConfigKind.Prod);
export const $httpConfig = $httpConfigKind.map((kind) => CONFIG_KIND_MAP.get(kind)!);

const init = createEvent();
const inited = createEvent();

export const setHeader = createEvent<SetHeaderPayload>();
export const setHeaderFx = createEffect((payload: SetHeaderPayload) => {
	if (payload.value === null) {
		delete AXIOS_INSTANCE.defaults.headers.common[payload.key];
		return;
	}

	AXIOS_INSTANCE.defaults.headers.common[payload.key] = payload.value;
});

export const toggleHttpConfig = createEvent();

export const setHttpConfigKindFx = createEffect((kind: HttpConfigKind) => {
	localStorage.setItem(CONFIG_KIND_KEY, kind);
});

export const getHttpConfigKindFx = createEffect((): HttpConfigKind => {
	const configKind = localStorage.getItem(CONFIG_KIND_KEY) ?? HttpConfigKind.Prod;
	if (Object.values(HttpConfigKind).includes(configKind as HttpConfigKind)) {
		return configKind as HttpConfigKind;
	}

	return HttpConfigKind.Prod;
});

export const setBaseUrlFx = createEffect((config: HttpConfig) => {
	AXIOS_INSTANCE.defaults.baseURL = getUrlFromConfig(config);
});

sample({
	clock: setHeader,
	target: setHeaderFx
});

export const inputs = {
	setHeader,
	init,
	inited,
	toggleHttpConfig
};

export const internals = {
	setHeaderFx,
	getHttpConfigKindFx,
	$httpConfig,
	$httpConfigKind,
	setHttpConfigKindFx,
	setBaseUrlFx
};
export const outputs = { inited, $httpConfigKind };
