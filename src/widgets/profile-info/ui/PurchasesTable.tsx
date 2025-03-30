import { Purchase } from '&features/get-purchases/api/types';
import { PurchaseItem } from './PurchaseItem';

interface props {
	purchases: Purchase[];
}
export function PurchasesTable({ purchases }: props) {
	return (
		<div className="relative h-0 w-full grow overflow-y-auto">
			<div className="sticky top-0 grid w-full grid-cols-4 items-start justify-center border-y border-solid border-color-gray-10 bg-color-bg-95 px-4 py-4">
				<div className="font-semibold text-color-gray-80">Дата и время</div>
				<div className="font-semibold text-color-gray-80">Статус</div>
				<div className="font-semibold text-color-gray-80">Платформа</div>
				<div className="font-semibold text-color-gray-80">Тип подписки</div>
			</div>
			<div className="flex w-full flex-col">
				{purchases.map((purchase) => (
					<PurchaseItem key={purchase.transactionId} purchase={purchase} />
				))}
			</div>
		</div>
	);
}
