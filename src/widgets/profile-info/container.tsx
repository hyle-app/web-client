import { inputs, outputs } from '&features/get-purchases';
import { authService } from '&shared/services/auth';
import { Button } from '&shared/ui/button';
import { Dialog, DialogTrigger } from '&shared/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '&shared/ui/tabs';
import { SubscribeModalWidget } from '&widgets/subscribe-modal';
import { useUnit } from 'effector-react';
import { useEffect } from 'react';
import { Props } from './types';
import { PurchaseItem } from './ui/PurchaseItem';

export function ProfileInfoWidget({}: Props) {
	const { user } = useUnit({
		user: authService.outputs.$user
	});
	const { purchases } = useUnit({
		purchases: outputs.$purchases
	});
	const { getPurchases } = useUnit({
		getPurchases: inputs.getAllPurchases
	});

	useEffect(() => {
		if (!user) return;
		getPurchases(user.uid);
	}, [user]);
	return (
		<div className="w-full max-w-md p-4">
			<Tabs defaultValue="account" className="w-full">
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
				<TabsContent value="account" className="mt-6 space-y-4">
					<div className="space-y-4">
						<div className="flex flex-row items-baseline gap-2">
							<span className="text-heading-4 text-color-gray-80">Email:</span>
							<span className="text-heading-4 text-color-text-and-icon-80">{user?.email}</span>
						</div>
						<div className="flex flex-row items-baseline gap-2">
							<span className="text-heading-4 text-color-gray-80">Тариф:</span>
							<span className="text-heading-4 text-color-text-and-icon-80">Hyle Pro</span>
						</div>
						<div className="flex flex-row items-baseline gap-2">
							<span className="text-heading-4 text-color-gray-80">Срок действия:</span>
							<span className="text-heading-4 text-color-text-and-icon-80">до 20.09.25</span>
						</div>
						<div className="flex flex-row items-baseline gap-2">
							<span className="text-heading-4 text-color-gray-80">Осталось до конца подписки:</span>
							<span className="text-heading-4 text-color-text-and-icon-80">14 дней</span>
						</div>
					</div>
					<Dialog>
						<DialogTrigger asChild>
							<Button variant="button" appearance="primary" className="w-full">
								Продлить подписку
							</Button>
						</DialogTrigger>
						<SubscribeModalWidget />
					</Dialog>
				</TabsContent>
				<TabsContent value="history">
					<div className="flex flex-col gap-4 py-4 text-center">
						{purchases.map((purchase) => (
							<PurchaseItem purchase={purchase} key={purchase.transactionId} />
						))}
					</div>
				</TabsContent>
			</Tabs>
		</div>
	);
}
