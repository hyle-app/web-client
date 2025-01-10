import { del, get, patch, post, put } from './lib';
import './relations';
import { inputs, outputs } from './model';

export type { HttpResponse } from './types';
export { HttpConfigKind } from './constants';

export const httpService = {
	inputs,
	outputs,
	lib: {
		get: get,
		put: put,
		post: post,
		patch: patch,
		delete: del
	}
};
