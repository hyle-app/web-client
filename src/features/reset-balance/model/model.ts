import { createEffect, createEvent } from 'effector';
import { resetBalanceApi } from '../api';

const resetBalance = createEvent();

const resetBalanceFx = createEffect(resetBalanceApi.editCustomerBalance);

export const inputs = {
	resetBalance
};

export const internals = {
	resetBalanceFx
};
