import { RegisteredRouter, Route, ToOptions } from '@tanstack/react-router';
import { createEffect, createEvent, createStore, sample } from 'effector';
import {
	NavigatePayload,
	PushRoutePayload,
	QueryParamsStorage,
	ReplaceRoutePayload,
	ResetQueryParamsPayload,
	SetQueryParamsPayload
} from './types';
import { getCurrentPathname, getCurrentQueryParams } from './lib';
import { reset, spread } from 'patronum';
import { dispatchEvent } from '&shared/utils';
import { postpone } from '&shared/utils/effector';

const $routerInstance = createStore<null | RegisteredRouter>(null);
const setInstance = createEvent<RegisteredRouter>();
const init = createEvent();

const routeChanged = createEvent<Route>();
const pushRoute = createEvent<PushRoutePayload>();
const replaceRoute = createEvent<ReplaceRoutePayload>();
const $currentPath = createStore<null | ToOptions['to']>(getCurrentPathname() ?? null);

const navigateFx = createEffect(
	({
		router,
		to,
		search,
		replace
	}: {
		router: RegisteredRouter;
		to: string;
		search: URLSearchParams;
		replace: boolean;
	}) => {
		const routerSearch: Record<string, unknown> = {};

		// NOTE: This shit is required for tanstack router to stop serializing stringified number using quotes
		search.entries().forEach(([key, value]) => {
			if (!isNaN(Number(value))) {
				routerSearch[key] = Number(value);
			} else {
				routerSearch[key] = value;
			}
		});
		router.navigate({
			to: to,
			search: routerSearch,
			replace
		});
	}
);

function createQueryParamStorage(name: string, defaultValue?: string): QueryParamsStorage<string | null> {
	const $store = createStore<string | null>(getCurrentQueryParams().get(name) ?? defaultValue ?? null);
	const set = createEvent<SetQueryParamsPayload>();
	const resetQueryValue = createEvent<ResetQueryParamsPayload>();
	const clearAllSubscriptionsFx = createEffect((subs: Array<() => void>) => subs.forEach((sub) => sub()));
	const localInit = createEvent();

	const readStateFx = createEffect(() => {
		const urlSearchParams = getCurrentQueryParams();
		const value = urlSearchParams.get(name) ?? null;

		return value;
	});

	type UnsubFunction = () => void;
	const $subscriptions = createStore<UnsubFunction[]>([]);
	const createSubscriptionFx = createEffect((router: RegisteredRouter) => {
		const unsub = router.subscribe('onResolved', (_event) => {
			dispatchEvent(readStateFx);
		});

		return unsub;
	});

	sample({
		clock: init,
		target: readStateFx
	});

	sample({
		clock: readStateFx.doneData,
		target: $store
	});

	sample({
		clock: [
			postpone({ clock: init, until: internals.$routerInstance.updates }),
			internals.$routerInstance.updates,
			localInit
		],
		source: { subscriptions: $subscriptions, router: internals.$routerInstance },
		filter: ({ router }) => Boolean(router),
		fn: ({ subscriptions }) => subscriptions,
		target: clearAllSubscriptionsFx
	});

	reset({
		clock: clearAllSubscriptionsFx,
		target: $subscriptions
	});

	sample({
		clock: clearAllSubscriptionsFx.finally,
		source: internals.$routerInstance,
		filter: (router): router is RegisteredRouter => Boolean(router),
		target: createSubscriptionFx
	});

	sample({
		clock: createSubscriptionFx.doneData,
		source: $subscriptions,
		fn: (subs, sub) => [...subs, sub],
		target: $subscriptions
	});

	sample({
		clock: [pushRoute, replaceRoute],
		filter: ({ search }) => {
			if (!search) return false;

			if (typeof search === 'function') {
				const newState = search(new URLSearchParams(window.location.search));
				if (newState.has(name)) return true;
			}

			if ('has' in search) {
				return search.has(name);
			}

			return false;
		},
		fn: ({ search }) => {
			if (typeof search === 'function') {
				const newState = search(new URLSearchParams(window.location.search));
				return newState.get(name) ?? null;
			}

			if ('has' in search) {
				return search.get(name) ?? null;
			}

			return null;
		},
		target: $store
	});

	sample({
		clock: [
			sample({
				clock: resetQueryValue,
				fn: (payload) => {
					const urlSearchParams = new URLSearchParams(window.location.search);
					urlSearchParams.delete(name);

					return {
						to: getCurrentPathname(),
						search: urlSearchParams,
						replace: payload?.replace ?? false
					};
				}
			}),
			sample({
				clock: set,
				fn: ({ value, replace }) => {
					const urlSearchParams = new URLSearchParams(window.location.search);
					urlSearchParams.set(name, value);

					return {
						to: getCurrentPathname(),
						search: urlSearchParams,
						replace: replace ?? false
					};
				}
			})
		],
		fn: (payload) => {
			if (payload.replace) {
				return {
					replace: payload as NavigatePayload
				};
			}

			return {
				push: payload as NavigatePayload
			};
		},
		target: spread({
			push: pushRoute,
			replace: replaceRoute
		})
	});

	dispatchEvent(localInit);

	return {
		$value: $store,
		set,
		reset: resetQueryValue
	};
}

export const inputs = { setInstance, replaceRoute, pushRoute, init };
export const outputs = { routeChanged, createQueryParamStorage, $currentPath };
export const internals = { $routerInstance, navigateFx };
