import { createEffect, createEvent, createStore } from 'effector';
import { GoogleAuthProvider, OAuthProvider, signInWithPopup, type User } from 'firebase/auth';
import { auth } from './lib';

const logout = createEvent();
const loginwithGoogle = createEvent();
const loginwithApple = createEvent();

const setUser = createEvent<User | null>();
const loginWithGoogleFx = createEffect(async () => {
	const provider = new GoogleAuthProvider();
	const user = await signInWithPopup(auth, provider);
	return user.user;
});

const loginWithAppleFx = createEffect(async () => {
	const provider = new OAuthProvider('apple.com');
	provider.addScope('email');
	provider.addScope('name');
	const userCreds = await signInWithPopup(auth, provider);
	return userCreds.user;
});

const setUserFx = createEffect(async (user: User | null) => {
	return user;
});

const logoutFx = createEffect(async () => {
	await auth.signOut();
	return null;
});
const $user = createStore<null | User>(null).reset(logout);

const $isLoggedIn = createStore(false).reset(logout);

const verifyAuthenticationFx = createEffect(async () => {
	const maybeUser = await auth.authStateReady();

	return Boolean(maybeUser);
});

const verifyAuthentication = createEvent();
const authenticationVerified = createEvent<boolean>();

export const inputs = {
	setUser,
	logout,
	loginwithApple,
	loginwithGoogle,
	verifyAuthentication
};
export const outputs = {
	$user,
	$isLoggedIn,
	authenticationVerified
};

export const internals = {
	loginWithAppleFx,
	loginWithGoogleFx,
	setUserFx,
	logoutFx,
	verifyAuthenticationFx
};
