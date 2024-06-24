import { createLazyFileRoute } from '@tanstack/react-router';
import { HomePageContainer } from './-container';

export const Route = createLazyFileRoute('/_auth/home/')({
	component: HomePageContainer
});
