import { timeService } from '&shared/services/time';
import { getApplicationScope } from '&shared/utils';
import { Outlet, createRootRoute } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { Provider, useUnit } from 'effector-react';
import React from 'react';
import { Toaster } from 'sonner';

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
				<Toaster
					className="toaster"
					toastOptions={{
						duration: 5000,
						unstyled: true,
						closeButton: true,
						classNames: {
							toast: 'rounded-2xl border bg-color-bg-100 border-2 p-4',
							success: 'border-color-success',
							warning: 'border-color-warning',
							error: 'border-color-error',
							info: 'border-color-brand-primary-50'
						}
					}}
				/>
				<Outlet />
				<TanStackRouterDevtools />
			</Provider>
		);
	}
});
