import { httpService } from '&shared/services/http';
import { Subscription } from './types';

export const getSubsription = async (customerId: string) => {
	const res = await httpService.lib.get<Subscription[]>(`/v2/subscription/user/${customerId}`);
	return res.data;
};
