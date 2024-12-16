import axios from 'axios';

export const PROD_API_BASE_URL = 'https://api.hyle.app';

export const AXIOS_INSTANCE = axios.create({
	baseURL: PROD_API_BASE_URL
});
