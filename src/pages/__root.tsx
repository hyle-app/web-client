import { timeService } from '&shared/services/time';
import { getApplicationScope } from '&shared/utils';
import { Outlet, createRootRoute } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { Provider, useUnit } from 'effector-react';
import React from 'react';

export const Route = createRootRoute({
	// TODO: Root layout
	component: () => {
		const { initTimeService } = useUnit({
			initTimeService: timeService.inputs.init
		});

		React.useEffect(() => {
			initTimeService();
		}, []);

		return (
			<Provider value={getApplicationScope()}>
				<Outlet />
				<TanStackRouterDevtools />
			</Provider>
		);
	}
});
