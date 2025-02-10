import { createEffect, createEvent, createStore } from 'effector';
import { BALANCE_MAX_VALUE } from './constants';
import { BalanceCategory } from '&shared/constants';
import { balanceApi } from '../api';
import { getInitialBalance } from './lib';

const $balance = createStore(getInitialBalance());

const fetchBalance = createEvent();

const $normalizedBalance = $balance.map((balance) => {
	return Object.entries(balance).reduce(
		(acc, [key, value]) => {
			acc[key as BalanceCategory] = value / BALANCE_MAX_VALUE;
			return acc;
		},
		{} as Record<BalanceCategory, number>
	);
});

const fetchBalanceFx = createEffect(balanceApi.fetchBalance);

export const outputs = {
	$balance,
	$normalizedBalance
};

export const inputs = { fetchBalance };
export const internals = {
	fetchBalanceFx
};
