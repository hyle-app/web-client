import { ToOptions } from '@tanstack/react-router';

export function getCurrentQueryParams(): URLSearchParams {
	return new URLSearchParams(window.location.search);
}

export function getCurrentPathname(): ToOptions['to'] {
	return window.location.pathname as ToOptions['to'];
}
