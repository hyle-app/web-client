import { Scope, fork } from 'effector';

const scope = fork();

export function getApplicationScope(): Scope {
	return scope;
}
