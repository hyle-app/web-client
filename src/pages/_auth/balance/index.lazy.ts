import { createLazyFileRoute } from '@tanstack/react-router';
import { BalancePageContainer } from './-container';

export const Route = createLazyFileRoute('/_auth/balance/')({
	component: BalancePageContainer
});
