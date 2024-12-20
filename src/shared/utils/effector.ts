import { type Scope, type Store, type UnitTargetable, type Event, allSettled, fork, createWatch } from 'effector';
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
