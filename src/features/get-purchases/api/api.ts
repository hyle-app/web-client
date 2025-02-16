import { httpService } from '&shared/services/http';
import { Purchase } from './types';

export const getPurchases = async (customerId: string) => {
	const res = await httpService.lib.get<Purchase[]>(`/v2/purchase/${customerId}`);
	return res.data.sort((a, b) => new Date(parseInt(b.createdAt)).getTime() - new Date(parseInt(a.createdAt)).getTime());
	return res.data;
};
