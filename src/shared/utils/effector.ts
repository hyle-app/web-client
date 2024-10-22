import { type Scope, type Store, type UnitTargetable, allSettled, fork } from 'effector';

const scope = fork();

export function getApplicationScope(): Scope {
	return scope;
}

export function dispatchEvent<T = void>(event: UnitTargetable<T>, payload: T): Promise<void> {
	return allSettled(event, { params: payload, scope });
}

export function getStateOf<T>(store: Store<T>): T {
	return scope.getState(store);
}
