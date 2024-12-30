import { httpService } from '&shared/services/http';
import { BalanceDTO, FetchBalanceParams } from './types';

async function fetchBalance({ customerId }: FetchBalanceParams): Promise<BalanceDTO> {
	const res = await httpService.lib.get<BalanceDTO>(`/v1/balance?customerId=${customerId}`);

	return res.data;
}

export const balanceApi = { fetchBalance };
