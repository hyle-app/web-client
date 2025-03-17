import { httpService } from '&shared/services/http';

async function deleteAccount(customerId: string): Promise<void> {
	const res = await httpService.lib.delete(`/customers/${customerId}`);
	console.log(res);
	return res.data;
}

export const deleteAccountApi = {
	deleteAccount
};
