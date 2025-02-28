import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { Outlet, createRootRoute, useRouter } from '@tanstack/react-router';
import { Provider } from 'effector-react';
import { dispatchEvent, getApplicationScope } from '&shared/utils';
import React from 'react';
import { routerService } from '&shared/services/router';

export const Route = createRootRoute({
	// TODO: Root layout
	component: () => {
		const router = useRouter();
		React.useEffect(() => {
			dispatchEvent(routerService.inputs.setInstance, router);
		}, []);

		return (
			<Provider value={getApplicationScope()}>
				<Outlet />
				<TanStackRouterDevtools />
			</Provider>
		);
	}
});
