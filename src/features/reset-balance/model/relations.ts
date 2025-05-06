import { sample } from 'effector';
import { inputs, internals } from './model';
import { authService } from '&shared/services/auth';
import { BalanceCategory } from '&shared/constants';
import { balanceEntity } from '&entities/balance';

sample({
	clock: inputs.resetBalance,
	source: authService.outputs.$user,
	fn: (user) => ({
		state: {
			[BalanceCategory.Hobby]: 0,
			[BalanceCategory.Family]: 0,
			[BalanceCategory.Career]: 0,
			[BalanceCategory.Health]: 0,
			[BalanceCategory.Finance]: 0,
			[BalanceCategory.Friends]: 0
		},
		customerId: user!.uid
	}),
	target: internals.resetBalanceFx
});

sample({
	clock: internals.resetBalanceFx.doneData,
	fn: () => ({
		[BalanceCategory.Hobby]: 0,
		[BalanceCategory.Family]: 0,
		[BalanceCategory.Career]: 0,
		[BalanceCategory.Health]: 0,
		[BalanceCategory.Finance]: 0,
		[BalanceCategory.Friends]: 0
	}),
	target: balanceEntity.inputs.setBalance
});
