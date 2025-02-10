export type SubscriptionKind = 'ONE_MONTH' | 'ONE_YEAR' | 'THREE_MONTH' | 'FOREVER';

export interface PaymentData {
	formUrl: string | null;
	orderNumber: string;
	orderStatus: null | number;
	returnUrl: string;
	subscriptionKind: SubscriptionKind;
	errorMessage: null | string;
	errorCode: null | number;
	customerId: null | string;
}

export interface getPaymentUrlParams {
	userId: string;
	kind: SubscriptionKind;
	returnHost: string;
	token: string;
}
