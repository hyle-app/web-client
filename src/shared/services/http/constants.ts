import axios from 'axios';
import type { HttpConfig } from './types';

export const PROD_API_BASE_URL = 'https://api.hyle.app';

export const AXIOS_INSTANCE = axios.create({
	baseURL: PROD_API_BASE_URL
});

export const PROD_HTTP_CONFIG: HttpConfig = {
	protocol: 'https',
	host: 'api.hyle.app'
};

export const DEV_HTTP_CONFIG: HttpConfig = {
	protocol: 'https',
	host: 'dev-api.hyle.app'
};

export const CONFIG_KIND_KEY = 'hyle/http_config/v1';

export enum HttpConfigKind {
	Prod = 'prod',
	Dev = 'dev'
}

export const CONFIG_KIND_MAP = new Map<HttpConfigKind, HttpConfig>()
	.set(HttpConfigKind.Prod, PROD_HTTP_CONFIG)
	.set(HttpConfigKind.Dev, DEV_HTTP_CONFIG);
