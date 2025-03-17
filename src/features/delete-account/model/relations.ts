import { authService } from '&shared/services/auth';
import { sample } from 'effector';
import { User } from 'firebase/auth';
import { inputs, internals } from './model';

sample({
	clock: inputs.deleteAccount,
	source: {
		isLoggedIn: authService.outputs.$isLoggedIn,
		user: authService.outputs.$user
	},
	filter: (sourceData): sourceData is { isLoggedIn: boolean; user: User } => sourceData.isLoggedIn && !!sourceData.user,
	fn: ({ user }) => user!.uid,
	target: internals.deleteAccountFx
});
sample({
	clock: internals.deleteAccountFx.doneData,
	target: authService.inputs.logout
});
