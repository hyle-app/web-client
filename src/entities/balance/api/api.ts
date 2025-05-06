import type { BalanceCategory } from '&shared/constants';
import { httpService } from '&shared/services/http';
import type { BalanceDTO, FetchBalanceParams, FetchBalanceCategoriesParams } from './types';

async function fetchBalance({ customerId }: FetchBalanceParams): Promise<BalanceDTO> {
	const res = await httpService.lib.get<BalanceDTO>(`/v2/balance/${customerId}`);

	return res.data;
}

async function fetchBalanceCategories({ customerId }: FetchBalanceCategoriesParams): Promise<BalanceCategory[]> {
	const res = await httpService.lib.get<BalanceCategory[]>(`/v2/balance/${customerId}/categories`);
	return res.data;
}

export const balanceApi = { fetchBalance, fetchBalanceCategories };
