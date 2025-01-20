import { httpService } from '&shared/services/http';
import { FetchUserFeatureStateParams, WebBetaResponse } from './types';

async function fetchUserFeaturesState({
	customerId
}: FetchUserFeatureStateParams): Promise<Record<string, WebBetaResponse>> {
	const webVersionRes = await httpService.lib.get<WebBetaResponse>(`/v2/customer/${customerId}/offer-status/WEB_BETA`);

	return {
		WEB_BETA: webVersionRes.data
	};
}
export const featureFlagsApi = { fetchUserFeaturesState };
