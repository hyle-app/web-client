import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { Outlet, createRootRoute } from '@tanstack/react-router';
import { Provider, useUnit } from 'effector-react';
import { timeService } from '&shared/services/time';
import React from 'react';
import { getApplicationScope } from '&shared/utils';

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
