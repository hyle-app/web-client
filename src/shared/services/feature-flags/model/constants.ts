import type { FeatureFlags } from './types';

export enum FeatureFlag {
	WebVersion = 'WEB_BETA'
}

export const DEFAULT_STATE: FeatureFlags = {
	[FeatureFlag.WebVersion]: { enabled: false }
};
