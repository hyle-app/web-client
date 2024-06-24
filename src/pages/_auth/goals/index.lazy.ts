import { createLazyFileRoute } from '@tanstack/react-router';
import { GoalsPage } from './-component';

export const Route = createLazyFileRoute('/_auth/goals/')({
	component: GoalsPage
});
