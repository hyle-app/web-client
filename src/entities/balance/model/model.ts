import { createEffect, createEvent, createStore } from 'effector';
import { BALANCE_MAX_VALUE } from './constants';
import { BalanceCategory } from '&shared/constants';
import { balanceApi } from '../api';
import { getInitialBalance } from './lib';
import { Balance } from './types';
import { debug } from 'patronum';

const $balance = createStore(getInitialBalance());

const setBalance = createEvent<Balance>();

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
const fetchBalanceCategoriesFx = createEffect(balanceApi.fetchBalanceCategories);
const $categories = createStore<BalanceCategory[]>(Object.keys(getInitialBalance()) as BalanceCategory[]);

export const outputs = {
	$balance,
	$normalizedBalance,
	$categories
};

export const inputs = { fetchBalance, setBalance };
export const internals = {
	fetchBalanceFx,
	fetchBalanceCategoriesFx
};
