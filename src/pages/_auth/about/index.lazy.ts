import { createLazyFileRoute } from '@tanstack/react-router';
import { AboutPageContainer } from './-container';

export const Route = createLazyFileRoute('/_auth/about/')({
	component: AboutPageContainer
});
