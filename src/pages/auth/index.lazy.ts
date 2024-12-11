import { createFileRoute } from '@tanstack/react-router';
import { AuthPageContainer } from './-container';

export const Route = createFileRoute('/auth/')({
	component: AuthPageContainer
});
