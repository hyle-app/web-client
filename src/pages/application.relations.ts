import { balanceEntity } from '&entities/balance';
import { goalEntity } from '&entities/goal';
import { habitEntity } from '&entities/habit';
import { reminderEntity } from '&entities/reminder';
import { taskEntity } from '&entities/task';
import { authService } from '&shared/services/auth';
import { FeatureFlag, featureFlagsService } from '&shared/services/feature-flags';
import { httpService } from '&shared/services/http';
import { routerService } from '&shared/services/router';
import { timeService } from '&shared/services/time';
import { EventPayload, sample } from 'effector';
import { combineEvents } from 'patronum';
import { ApplicationState } from './application.constants';
import { inputs, internals, outputs } from './application.model';

sample({
	clock: inputs.startApplication,
	target: [routerService.inputs.init, timeService.inputs.init, httpService.inputs.init]
});

sample({
	clock: combineEvents([
		// TODO: Add condition to wait for all services to initialize if required
		httpService.outputs.inited
	]),
	target: internals.applicatonServicesInitialized
});

sample({
	clock: internals.applicatonServicesInitialized,
	target: internals.verifyAuthentication
});

sample({
	clock: internals.verifyAuthentication,
	target: authService.inputs.verifyAuthentication
});

sample({
	clock: authService.outputs.authenticationVerified,
	// TODO: Add authentication verification logic
	target: internals.authenticationVerificationFinished
});

sample({
	clock: internals.authenticationVerificationFinished,
	target: [internals.fetchCustomerData, internals.fetchFeatureFlags]
});

sample({
	clock: internals.fetchFeatureFlags,
	target: featureFlagsService.inputs.fetchFeatureFlags
});

sample({
	clock: featureFlagsService.outputs.featureFlagsFetched,
	target: internals.featureFlagsFetched
});

sample({
	clock: internals.featureFlagsFetched,
	target: internals.applicationReady
});

sample({
	clock: internals.fetchCustomerData,
	source: {
		timestamp: timeService.outputs.$currentAppDateStart
	},
	fn: ({ timestamp }) => timestamp,
	target: [
		taskEntity.inputs.fetchTasksOfDay,
		habitEntity.inputs.fetchHabitsOfDay,
		reminderEntity.inputs.fetchRemindersOfDay,
		goalEntity.inputs.fetchGoalsAndAchievements,
		balanceEntity.inputs.fetchBalance
	]
});

// #region Application state
sample({
	clock: inputs.startApplication,
	fn: () => ApplicationState.InitializingServices,
	target: outputs.$state
});

sample({
	clock: internals.verifyAuthentication,
	fn: () => ApplicationState.VerifyingAuthentication,
	target: outputs.$state
});

sample({
	clock: internals.authenticationVerificationFinished,
	fn: () => ApplicationState.Running,
	target: outputs.$state
});
// #endregion

// #region WEB Version preview
sample({
	clock: combineEvents([internals.featureFlagsFetched, featureFlagsService.outputs.$featureFlags.updates]),
	source: { flags: featureFlagsService.outputs.$featureFlags },
	filter: ({ flags }) => !flags[FeatureFlag.WebVersion].enabled,
	fn: () =>
		({
			to: '/web-version-teaser',
			search: new URLSearchParams()
		}) as EventPayload<typeof routerService.inputs.replaceRoute>,
	target: routerService.inputs.replaceRoute
});

sample({
	clock: combineEvents([internals.featureFlagsFetched, featureFlagsService.outputs.$featureFlags.updates]),
	source: { flags: featureFlagsService.outputs.$featureFlags, currentRoute: routerService.outputs.$currentPath },
	filter: ({ flags, currentRoute }) => flags[FeatureFlag.WebVersion].enabled && currentRoute === '/web-version-teaser',
	fn: () =>
		({
			to: '/home',
			search: new URLSearchParams()
		}) as EventPayload<typeof routerService.inputs.replaceRoute>,
	target: routerService.inputs.replaceRoute
});

// #endregion

// #region runtime data fetching section
sample({
	clock: combineEvents([timeService.outputs.$currentAppDateStart.updates, timeService.inputs.changeCurrentAppDate]),
	source: timeService.outputs.$currentAppDateStart,
	target: [
		taskEntity.inputs.fetchTasksOfDay,
		habitEntity.inputs.fetchHabitsOfDay,
		reminderEntity.inputs.fetchRemindersOfDay
	]
});

sample({
	clock: httpService.outputs.$httpConfigKind.updates,
	target: [
		taskEntity.inputs.resetTasksList,
		reminderEntity.inputs.resetReminderList,
		habitEntity.inputs.resetHabitsList,
		goalEntity.inputs.resetGoalsList,
		inputs.startApplication
	]
});
// #endregion
