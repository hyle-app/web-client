import { routerService } from '&shared/services/router';
import { ThemeProvider } from '&shared/ui/theme-provider';
import { dispatchEvent, getApplicationScope } from '&shared/utils';
import { Outlet, createRootRoute, useRouter } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { Provider } from 'effector-react';
import React from 'react';

export const Route = createRootRoute({
	// TODO: Root layout
	component: () => {
		const router = useRouter();
		React.useEffect(() => {
			dispatchEvent(routerService.inputs.setInstance, router);
		}, []);
		return (
			<Provider value={getApplicationScope()}>
				<ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
					<Outlet />
					<TanStackRouterDevtools />
				</ThemeProvider>
			</Provider>
		);
	}
});
