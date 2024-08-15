import { createStore } from 'effector';
import { getRandomBalanceState } from './__mocks__';
import { BALANCE_MAX_VALUE } from './constants';
import { BalanceCategory } from '&shared/constants';

const $balance = createStore(getRandomBalanceState());

const $normalizedBalance = $balance.map((balance) => {
	return Object.entries(balance).reduce(
		(acc, [key, value]) => {
			acc[key as BalanceCategory] = value / BALANCE_MAX_VALUE;
			return acc;
		},
		{} as Record<BalanceCategory, number>
	);
});

export const outputs = {
	$balance,
	$normalizedBalance
};
