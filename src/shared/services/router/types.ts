import { RegisteredRouter, ToSubOptions } from '@tanstack/react-router';
import type { Store, EventCallable } from 'effector';

export type NavigatePayload = {
	to?: ToSubOptions<RegisteredRouter>['to'];
	search: URLSearchParams | ((searchParams: URLSearchParams) => URLSearchParams);
};

export type PushRoutePayload = NavigatePayload;
export type ReplaceRoutePayload = NavigatePayload;

export type ResetQueryParamsPayload = {
	replace: boolean;
} | void;

export type SetQueryParamsPayload = {
	value: string;
	replace?: boolean;
};

export type QueryParamsStorage<Value> = {
	$value: Store<Value>;
	set: EventCallable<SetQueryParamsPayload>;
	reset: EventCallable<ResetQueryParamsPayload>;
};
