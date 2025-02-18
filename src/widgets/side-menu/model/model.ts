import { createEffect, createEvent, createStore } from 'effector';

const setSideMenuOpen = createEvent<boolean>();
const $isSideMenuOpen = createStore<boolean>(true);

const setSideMenuOpenFx = createEffect((isOpen: boolean) => {
	return isOpen;
});

export const inputs = {
	setSideMenuOpen
};

export const outputs = {
	$isSideMenuOpen
};

export const internals = {
	setSideMenuOpenFx
};
