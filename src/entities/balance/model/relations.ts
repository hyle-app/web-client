import { sample } from 'effector';
import { inputs, internals, outputs } from './model';
import { authService } from '&shared/services/auth';
import { mapDtoToBalance } from './mappers';

sample({
	clock: inputs.fetchBalance,
	source: { user: authService.outputs.$user },
	filter: authService.outputs.$isLoggedIn,
	fn: ({ user }) => ({ customerId: user!.uid }),
	target: [internals.fetchBalanceFx, internals.fetchBalanceCategoriesFx]
});

sample({
	clock: internals.fetchBalanceFx.doneData,
	fn: (balanceDto) => mapDtoToBalance(balanceDto),
	target: outputs.$balance
});

sample({
	clock: inputs.setBalance,
	target: outputs.$balance
});
