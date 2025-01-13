import { httpService } from '&shared/services/http';
import { Purchase } from './types';

export const getPurchases = async (customerId: string) => {
	const res = await httpService.lib.get<Purchase[]>(`/v2/purchase/${customerId}`);
	return res.data;
};
