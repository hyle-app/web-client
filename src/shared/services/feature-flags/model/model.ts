import { createEffect, createEvent, createStore } from 'effector';
import { FeatureFlags } from './types';
import { featureFlagsApi } from '../api';
import { DEFAULT_STATE } from './constants';

const $featureFlags = createStore<FeatureFlags>(DEFAULT_STATE);
const fetchFeatureFlags = createEvent();
const fetchFeatureFlagsFx = createEffect(featureFlagsApi.fetchUserFeaturesState);
const featureFlagsFetched = createEvent();

export const inputs = {
	fetchFeatureFlags
};
export const outputs = {
	featureFlagsFetched,
	$featureFlags
};
export const internals = { fetchFeatureFlagsFx };
