import { inputs as getPurchasesInputs, outputs as getPurchasesOutputs } from '&features/get-purchases';
import { inputs as getSubscriptionInputs, outputs as getSubscriptionOutputs } from '&features/get-subscription';
import { authService } from '&shared/services/auth';
import { Button } from '&shared/ui/button';
import { Dialog, DialogTrigger } from '&shared/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '&shared/ui/tabs';
import { useUnit } from 'effector-react';
import { useEffect } from 'react';
import { getTimeRemaining, makeReadableSubscriptionExpiration, makeReadableSubscriptionTier } from './lib/utils';
import { Props } from './types';
import { PurchasesTable } from './ui/PurchasesTable';
import { SubscribeModal } from './ui/SubscribeModal';

export function ProfileInfoWidget({}: Props) {
	const { user } = useUnit({
		user: authService.outputs.$user
	});
	const { purchases, subscription } = useUnit({
		purchases: getPurchasesOutputs.$purchases,
		subscription: getSubscriptionOutputs.$subscription
	});
	const { getPurchases, getSubscription } = useUnit({
		getPurchases: getPurchasesInputs.getAllPurchases,
		getSubscription: getSubscriptionInputs.getUserSubscription
	});

	useEffect(() => {
		if (!user) return;
		getPurchases(user.uid);
		getSubscription(user.uid);
	}, [user]);
	return (
		<div className="h-full w-full p-4">
			<Tabs defaultValue="account" className="flex h-full flex-col">
				<TabsList className="h-auto w-full justify-start space-x-6">
					<TabsTrigger
						value="account"
						className="border-x-0 border-b-2 border-t-0 text-heading-3 text-color-gray-80 data-[state=active]:border-solid data-[state=active]:border-color-brand-primary-50 data-[state=active]:text-color-text-and-icon-80"
					>
						Аккаунт
					</TabsTrigger>
					<TabsTrigger
						value="history"
						className="border-x-0 border-b-2 border-t-0 text-heading-3 text-color-gray-80 data-[state=active]:border-solid data-[state=active]:border-color-brand-primary-50 data-[state=active]:text-color-text-and-icon-80"
					>
						История операций
					</TabsTrigger>
				</TabsList>
				<TabsContent value="account" className="mt-12 w-full max-w-md space-y-4">
					<div className="space-y-4">
						<div className="flex flex-row items-baseline gap-2">
							<span className="text-subheader-1 font-semibold text-color-gray-80">Email:</span>
							<span className="text-subheader-1 text-color-text-and-icon-80">{user?.email}</span>
						</div>
						{subscription && (
							<div className="flex flex-row items-baseline gap-2">
								<span className="text-subheader-1 font-semibold text-color-gray-80">Тариф:</span>
								<span className="text-subheader-1 text-color-brand-primary-50">
									{makeReadableSubscriptionTier(subscription.subscriptionTier)}
								</span>
							</div>
						)}
						{subscription && (
							<div className="flex flex-row items-baseline gap-2">
								<span className="text-subheader-1 font-semibold text-color-gray-80">Срок действия:</span>
								<span className="text-subheader-1 text-color-text-and-icon-80">
									до {makeReadableSubscriptionExpiration(subscription.subscriptionExpiration)}
								</span>
							</div>
						)}
						{subscription && (
							<div className="flex flex-row items-baseline gap-2">
								<span className="text-subheader-1 font-semibold text-color-gray-80">Осталось до конца подписки:</span>
								<span className="text-subheader-1 text-color-text-and-icon-80">
									{subscription && getTimeRemaining(subscription.subscriptionExpiration)}
								</span>
							</div>
						)}
					</div>
					<Dialog>
						<DialogTrigger asChild>
							<Button variant="button" appearance="primary" className="w-full">
								Продлить подписку
							</Button>
						</DialogTrigger>
						<SubscribeModal />
					</Dialog>
				</TabsContent>
				<TabsContent value="history" className="flex flex-grow">
					<div className="mt-12 flex w-full grow flex-col gap-4 py-4 text-center">
						<PurchasesTable purchases={purchases} />
					</div>
				</TabsContent>
			</Tabs>
		</div>
	);
}
