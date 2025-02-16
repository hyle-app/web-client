export type SubscriptionKind = 'ONE_MONTH' | 'ONE_YEAR' | 'THREE_MONTH' | 'FOREVER';

export type Purchase = {
	transactionId: string;
	status: null | string;
	subscriptionKind: SubscriptionKind;
	errorMessage: null | string;
	platform: 'WEB' | 'IOS';
	createdAt: string;
};
