import './index.css';

import { dispatchEvent } from '&shared/utils';
import { RouterProvider, createRouter } from '@tanstack/react-router';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import dayjsIsBetweenPlugin from 'dayjs/plugin/isBetween';
import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';

dayjs.extend(dayjsIsBetweenPlugin);
dayjs.locale('ru');

// Import the generated route tree
import { applicationModel } from './pages/application.model';
import { routeTree } from './routeTree.gen';

// Create a new router instance
const router = createRouter({
	routeTree,
	defaultPreload: 'intent'
});

// Register the router instance for type safety
declare module '@tanstack/react-router' {
	interface Register {
		router: typeof router;
	}
}

dispatchEvent(applicationModel.inputs.startApplication);

// Render the app
const rootElement = document.getElementById('app')!;
if (!rootElement.innerHTML) {
	const root = ReactDOM.createRoot(rootElement);
	root.render(
		<StrictMode>
			<RouterProvider router={router} />
		</StrictMode>
	);
}
