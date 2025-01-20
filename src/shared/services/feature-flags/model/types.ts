import { FeatureFlag } from './constants';

export type DefaultFeatureFlag = {
	enabled: boolean;
};

export type FeatureFlags = {
	[FeatureFlag.WebVersion]: DefaultFeatureFlag;
};
