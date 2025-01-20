import { createEvent, createStore } from 'effector';
import { ApplicationState } from './application.constants';

const $state = createStore(ApplicationState.Initial);

const startApplication = createEvent();
const applicatonServicesInitialized = createEvent();
const verifyAuthentication = createEvent();
const authenticationVerificationFinished = createEvent();
const fetchCustomerData = createEvent();
const fetchFeatureFlags = createEvent();
const featureFlagsFetched = createEvent();
const applicationReady = createEvent();

export const inputs = { startApplication };
export const outputs = { $state };
export const internals = {
	applicatonServicesInitialized,
	verifyAuthentication,
	authenticationVerificationFinished,
	fetchCustomerData,
	fetchFeatureFlags,
	featureFlagsFetched,
	applicationReady
};

export const applicationModel = {
	inputs,
	outputs
};
