import { Purchase } from '&features/get-purchases/api/types';
import { PurchaseItem } from './PurchaseItem';

interface props {
	purchases: Purchase[];
}
export function PurchasesTable({ purchases }: props) {
	return (
		<div className="w-full">
			<div className="grid w-full grid-cols-4 items-start justify-center border-y border-solid border-color-gray-10 px-4 py-4">
				<div className="text-color-gray-80">Дата и время</div>
				<div className="text-color-gray-80">Статус</div>
				<div className="text-color-gray-80">Платформа</div>
				<div className="text-color-gray-80">Тип подписки</div>
			</div>
			<div className="flex w-full flex-col">
				{purchases.map((purchase) => (
					<PurchaseItem key={purchase.transactionId} purchase={purchase} />
				))}
			</div>
		</div>
	);
}
