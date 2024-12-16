import { AxiosResponse } from 'axios';

export type SetHeaderPayload = {
	key: string;
	value: string | null;
};

export type HttpResponse<Data> = AxiosResponse<Data>;
