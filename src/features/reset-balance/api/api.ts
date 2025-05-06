import { httpService } from '&shared/services/http';

import { EditCustomerBalanceParams } from './types';

async function editCustomerBalance(params: EditCustomerBalanceParams): Promise<void> {
	await httpService.lib.post(`/v2/balance/${params.customerId}`, params.state);
}

export const resetBalanceApi = {
	editCustomerBalance
};
