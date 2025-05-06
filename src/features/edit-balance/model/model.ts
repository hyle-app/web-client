import { balanceEntity } from '&entities/balance';
import { Balance } from '&entities/balance/model';
import { BalanceCategory } from '&shared/constants';
import { routerService } from '&shared/services/router';
import { createEffect, createEvent, sample } from 'effector';
import { editBalanceApi } from '../api';
import { authService } from '&shared/services/auth';

const isEditModalOpenQuery = routerService.outputs.createQueryParamStorage('selected_achievement_id');
const $isModalOpen = isEditModalOpenQuery.$value.map((value) => value === '"true"');
const editBalanceCategories = createEvent<BalanceCategory[]>();
const openSidebar = createEvent();
const closeSidebar = createEvent();
const editBalanceCategoriesFx = createEffect(editBalanceApi.setUserCategories);

sample({
	clock: openSidebar,
	fn: () => ({
		value: 'true'
	}),
	target: isEditModalOpenQuery.set
});

sample({
	clock: closeSidebar,
	target: isEditModalOpenQuery.reset
});

sample({
	clock: editBalanceCategoriesFx.done,
	target: balanceEntity.inputs.fetchBalance
});

sample({
	clock: editBalanceCategories,
	source: { balance: balanceEntity.outputs.$balance, user: authService.outputs.$user },
	fn: ({ balance, user }, v) => {
		const b = v.reduce((acc, x) => {
			acc[x] = balance[x] ?? 1;
			return acc;
		}, {} as Balance);

		return { balance: b, customerId: user!.uid };
	},
	target: editBalanceCategoriesFx
});

export const outputs = { $isModalOpen };
export const inputs = { editBalanceCategories, openSidebar, closeSidebar };
