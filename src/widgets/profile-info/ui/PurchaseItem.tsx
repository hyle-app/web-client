import type { Purchase } from '&features/get-purchases/api/types';
import { Typography } from '&shared/ui/typography';
import { cn } from '&shared/utils';
import { makeReadableDate, makeReadableStatus, makeReadableSubscriptionKind } from '../lib/utils';

export function PurchaseItem({ purchase }: { purchase: Purchase }) {
	return (
		<div className="grid w-full grid-cols-4 items-baseline justify-start border-b border-solid border-color-gray-10 px-4 py-4">
			<Typography variant="caption-1">{makeReadableDate(purchase.createdAt)}</Typography>
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
			<Typography variant="caption-1">{purchase.platform}</Typography>
			<Typography variant="caption-1">{makeReadableSubscriptionKind(purchase.subscriptionKind)}</Typography>
		</div>
	);
}
