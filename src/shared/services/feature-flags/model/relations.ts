import { sample } from 'effector';
import { inputs, internals, outputs } from './model';
import { authService } from '&shared/services/auth';
import { mapDtoToState } from './mappers';
import { DEFAULT_STATE } from './constants';

sample({
	clock: inputs.fetchFeatureFlags,
	source: { user: authService.outputs.$user },
	filter: authService.outputs.$isLoggedIn,
	fn: ({ user }) => ({ customerId: user!.uid }),
	target: internals.fetchFeatureFlagsFx
});

sample({
	clock: internals.fetchFeatureFlagsFx.doneData,
	fn: mapDtoToState,
	target: [outputs.$featureFlags, outputs.featureFlagsFetched]
});

sample({
	clock: internals.fetchFeatureFlagsFx.failData,
	fn: () => DEFAULT_STATE,
	target: [outputs.$featureFlags, outputs.featureFlagsFetched]
});
