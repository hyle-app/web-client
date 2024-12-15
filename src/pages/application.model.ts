import { createEvent, createStore } from 'effector';
import { ApplicationState } from './application.constants';

const $state = createStore(ApplicationState.Initial);

const startApplication = createEvent();
const applicatonServicesInitialized = createEvent();
const verifyAuthentication = createEvent();
const authenticationVerificationFinished = createEvent();
const fetchCustomerData = createEvent();
const applicationReady = createEvent();

export const inputs = { startApplication };
export const outputs = { $state };
export const internals = {
	applicatonServicesInitialized,
	verifyAuthentication,
	authenticationVerificationFinished,
	fetchCustomerData,
	applicationReady
};

export const applicationModel = {
	inputs,
	outputs
};
