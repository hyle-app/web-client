import { FetchUserFeatureStateDTO } from '../api';
import { FeatureFlag } from './constants';
import { FeatureFlags } from './types';

export function mapDtoToState(dto: FetchUserFeatureStateDTO): FeatureFlags {
	const defaultState = { enabled: false };

	return {
		[FeatureFlag.WebVersion]: dto[FeatureFlag.WebVersion] === 'AVAILABLE' ? { enabled: true } : defaultState
	};
}
