import { createLazyFileRoute } from '@tanstack/react-router';
import { ProfilePageContainer } from './-container';

export const Route = createLazyFileRoute('/_auth/profile/')({
	component: ProfilePageContainer
});
