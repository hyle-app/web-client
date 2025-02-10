import { httpService } from '&shared/services/http';
import { getPaymentUrlParams, PaymentData } from './types';

export const getWebpayUrl = async ({ userId, kind, returnHost, token }: getPaymentUrlParams) => {
	const res = await httpService.lib.post<PaymentData>(
		`/v2/webpay`,
		{
			userId,
			kind,
			returnHost
		},
		{
			headers: {
				Authorization: `Bearer ${token}`
			}
		}
	);
	return res.data;
};
