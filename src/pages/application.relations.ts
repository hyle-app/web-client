import { sample } from 'effector';
import { inputs, internals, outputs } from './application.model';
import { timeService } from '&shared/services/time';
import { ApplicationState } from './application.constants';
import { combineEvents } from 'patronum';
import { taskEntity } from '&entities/task';
import { authService } from '&shared/services/auth';
import { habitEntity } from '&entities/habit';

sample({
	clock: inputs.startApplication,
	target: [timeService.inputs.init]
});

sample({
	clock: combineEvents([
		// TODO: Add condition to wait for all services to initialize if required
		inputs.startApplication
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
	target: [internals.fetchCustomerData, internals.applicationReady]
});

sample({
	clock: internals.fetchCustomerData,
	source: {
		timestamp: timeService.outputs.$currentAppDateStart
	},
	fn: ({ timestamp }) => timestamp,
	target: [taskEntity.inputs.fetchTasksOfDay, habitEntity.inputs.fetchHabitsOfDay]
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
