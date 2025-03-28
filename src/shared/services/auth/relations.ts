import { dispatchEvent, getStateOf } from '&shared/utils/effector';
import { sample } from 'effector';
import { onAuthStateChanged, onIdTokenChanged } from 'firebase/auth';
import { httpService } from '../http';
import { auth } from './lib';
import { inputs, internals, outputs } from './model';

sample({
	clock: inputs.setUser,
	target: internals.setUserFx
});

sample({
	clock: internals.setUserFx.doneData,
	target: outputs.$user
});

sample({
	clock: internals.setUserFx.doneData,
	fn: (user) => user !== null,
	target: outputs.$isLoggedIn
});

sample({
	clock: inputs.loginwithGoogle,
	target: internals.loginWithGoogleFx
});
sample({
	clock: inputs.loginwithApple,
	target: internals.loginWithAppleFx
});

sample({
	clock: internals.loginWithGoogleFx.doneData,
	target: inputs.setUser
});

sample({
	clock: internals.loginWithAppleFx.doneData,
	target: inputs.setUser
});

sample({
	clock: inputs.setUser,
	target: outputs.$user
});

sample({
	clock: inputs.logout,
	target: internals.logoutFx
});

sample({
	clock: internals.logoutFx.doneData,
	fn: () => {
		return null;
	},
	target: outputs.$user
});

sample({
	clock: inputs.verifyAuthentication,
	target: internals.verifyAuthenticationFx
});

sample({
	clock: internals.verifyAuthenticationFx.doneData,
	target: outputs.authenticationVerified
});

onIdTokenChanged(auth, async (user) => {
	if (!user) {
		dispatchEvent(httpService.inputs.setHeader, { key: 'Authorization', value: null });
		return;
	}

	const idTokenResult = await user.getIdTokenResult();
	const idToken = idTokenResult.token ?? null;
	const expiresIn = new Date(idTokenResult.expirationTime).getTime() - Date.now();
	setTimeout(
		() => {
			// Force update token on expiration
			user.getIdTokenResult(true);
		},
		expiresIn - 1000 * 60
	);
	dispatchEvent(httpService.inputs.setHeader, { key: 'Authorization', value: `Bearer ${idToken}` });
});

onAuthStateChanged(auth, (user) => {
	if (user) {
		dispatchEvent(inputs.setUser, user);
		return;
	}

	if (getStateOf(outputs.$user) !== null) {
		dispatchEvent(inputs.logout);
	}
});
