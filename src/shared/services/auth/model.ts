import { createEffect, createEvent, createStore } from 'effector';
import { GoogleAuthProvider, signInWithPopup, type User } from 'firebase/auth';
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
	// TODO:
	return null;
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

export const inputs = {
	setUser,
	setUserFx,
	logout,
	logoutFx,
	loginwithApple,
	loginwithGoogle,
	loginWithAppleFx,
	loginWithGoogleFx
};
export const outputs = {
	$user,
	$isLoggedIn
};
