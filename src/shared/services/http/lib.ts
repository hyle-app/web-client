import { AXIOS_INSTANCE } from './constants';
import { HttpConfig } from './types';

export const get = AXIOS_INSTANCE.get;
export const post = AXIOS_INSTANCE.post;
export const put = AXIOS_INSTANCE.put;
export const patch = AXIOS_INSTANCE.patch;
export const del = AXIOS_INSTANCE.delete;

export function getUrlFromConfig(config: HttpConfig): string {
	let url = '';

	if (config.protocol) {
		url += `${config.protocol}://`;
	}

	url += config.host;

	if (config.port) {
		url += `:${config.port}`;
	}

	return url;
}
