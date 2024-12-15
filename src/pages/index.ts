import { createFileRoute, redirect } from '@tanstack/react-router';
import './application.relations';

export const Route = createFileRoute('/')({
	loader: () => {
		throw redirect({
			to: '/home'
		});
	}
});
