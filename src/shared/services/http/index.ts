import { del, get, patch, post, put } from './lib';
import { inputs } from './model';

export type { HttpResponse } from './types';

export const httpService = {
	inputs,
	lib: {
		get: get,
		put: put,
		post: post,
		patch: patch,
		delete: del
	}
};
