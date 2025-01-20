export type WebBetaResponse = 'AVAILABLE' | 'UNAVAILABLE';

export type FetchUserFeatureStateDTO = Record<string, WebBetaResponse>;

export type FetchUserFeatureStateParams = {
	customerId: string;
};
