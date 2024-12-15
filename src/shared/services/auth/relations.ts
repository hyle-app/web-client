import { sample } from 'effector';
import { inputs, outputs } from './model';

sample({
	clock: inputs.setUser,
	target: inputs.setUserFx
});

sample({
	clock: inputs.setUserFx.doneData,
	target: outputs.$user
});

sample({
	clock: inputs.setUserFx.doneData,
	fn: (user) => user !== null,
	target: outputs.$isLoggedIn
});

sample({
	clock: inputs.loginwithGoogle,
	target: inputs.loginWithGoogleFx
});
sample({
	clock: inputs.loginwithApple,
	target: inputs.loginWithAppleFx
});

sample({
	clock: inputs.loginWithGoogleFx.doneData,
	target: inputs.setUser
});

sample({
	clock: inputs.loginWithAppleFx.doneData,
	target: inputs.setUser
});

sample({
	clock: inputs.setUser,
	target: outputs.$user
});

sample({
	clock: inputs.logout,
	target: inputs.logoutFx
});

sample({
	clock: inputs.logoutFx.doneData,
	fn: () => null,
	target: outputs.$user
});
