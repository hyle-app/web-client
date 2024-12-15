import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { Outlet, createRootRoute } from '@tanstack/react-router';
import { Provider } from 'effector-react';
import { getApplicationScope } from '&shared/utils';
import { Outlet, createRootRoute } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { Provider, useUnit } from 'effector-react';
import React from 'react';

export const Route = createRootRoute({
	// TODO: Root layout
	component: () => {
		return (
			<Provider value={getApplicationScope()}>
				<Outlet />
				<TanStackRouterDevtools />
			</Provider>
		);
	}
});
