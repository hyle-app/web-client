import type { Purchase } from '&features/get-purchases/api/types';
import { cn } from '&shared/utils';
import { makeReadableDate, makeReadableStatus, makeReadableSubscriptionKind } from '../lib/utils';

export function PurchaseItem({ purchase }: { purchase: Purchase }) {
	return (
		<div className="grid w-full grid-cols-4 items-baseline justify-start border-b border-solid border-color-gray-10 px-4 py-4">
			<span className="text-caption-1 text-color-text-and-icon-80">{makeReadableDate(purchase.createdAt)}</span>
			<div className="flex w-full flex-col">
				<span
					className={cn(
						'rounded-lg border border-solid py-2',
						purchase.status === 'ERROR' && 'border-color-error text-color-error',
						purchase.status === 'PENDING' && 'border-color-warning text-color-warning',
						purchase.status === 'SUCCESS' && 'border-color-success text-color-success'
					)}
				>
					{makeReadableStatus(purchase.status)}
				</span>
			</div>
			<span className="text-caption-1 text-color-text-and-icon-80">{purchase.platform}</span>
			<span className="text-caption-1 text-color-text-and-icon-80">
				{makeReadableSubscriptionKind(purchase.subscriptionKind)}
			</span>
		</div>
	);
}
