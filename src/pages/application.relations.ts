import { sample } from 'effector';
import { inputs, internals, outputs } from './application.model';
import { timeService } from '&shared/services/time';
import { ApplicationState } from './application.constants';
import { combineEvents } from 'patronum';
import { taskEntity } from '&entities/task';
import { authService } from '&shared/services/auth';
import { habitEntity } from '&entities/habit';
import { reminderEntity } from '&entities/reminder';
import { routerService } from '&shared/services/router';
import { goalEntity } from '&entities/goal';
import { balanceEntity } from '&entities/balance';
import { httpService } from '&shared/services/http';

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
	target: [internals.fetchCustomerData, internals.applicationReady]
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
