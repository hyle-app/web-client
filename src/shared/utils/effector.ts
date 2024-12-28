import {
	type Scope,
	type Store,
	type UnitTargetable,
	type Event,
	allSettled,
	fork,
	createWatch,
	EventAsReturnType,
	createStore,
	is,
	sample
} from 'effector';
import { and } from 'patronum';
import React from 'react';

const scope = fork();

export function getApplicationScope(): Scope {
	return scope;
}

export function dispatchEvent(event: UnitTargetable<void>): Promise<void>;
export function dispatchEvent<T>(event: UnitTargetable<T>, payload: T): Promise<void>;
export function dispatchEvent<T>(event: UnitTargetable<T>, payload?: T): Promise<void> {
	if (payload === undefined) {
		return allSettled(event as UnitTargetable<void>, { scope });
	}

	return allSettled(event, { params: payload, scope });
}

export function getStateOf<T>(store: Store<T>): T {
	return scope.getState(store);
}

export function useEventEffect<T = void>(event: UnitTargetable<T> | Event<T>, effect: (payload: T) => void): void {
	React.useEffect(() => {
		const subscription = createWatch({
			unit: event,
			fn: (payload) => effect(payload),
			scope
		});

		return () => subscription.unsubscribe();
	}, [effect]);
}

/**
 * Откладывает выполнение события до переданного указанного стора в состояние `true`
 *
 * @note вызовы clock батчатся
 *
 * @returns событие, которое будет вызвано после вызова clock, когда until будет true
 */
export function postpone<T>({
	clock,
	until
}: {
	clock: Event<T>;
	until: Event<any> | Store<boolean>;
}): EventAsReturnType<T> {
	const $pendingCall = createStore(false).on(clock, () => true);
	const $pendingCallUntil = is.store(until) ? until : createStore(false).on(until, () => true);
	const $allowCall = and($pendingCallUntil, $pendingCall);

	const postponed = sample({
		clock: [clock, until],
		source: clock,
		filter: $allowCall
	});

	$pendingCall.reset(postponed);

	return postponed;
}
