import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { Outlet, createRootRoute } from '@tanstack/react-router';

export const Route = createRootRoute({
	// TODO: Root layout
	component: () => (
		<>
			<Outlet />
			<TanStackRouterDevtools />
		</>
	)
});
