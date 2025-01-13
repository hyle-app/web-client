import type { Purchase } from '&features/get-purchases/api/types';

export function PurchaseItem({ purchase }: { purchase: Purchase }) {
	return <div>{purchase.createdAt}</div>;
}
