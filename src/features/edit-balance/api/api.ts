import { httpService } from '&shared/services/http';
import { SetUserCategoriesParams } from './types';

async function setUserCategories({ customerId, balance }: SetUserCategoriesParams): Promise<void> {
	await httpService.lib.post(`/v2/balance/${customerId}/categories`, Object.keys(balance));
}

export const editBalanceApi = { setUserCategories };
