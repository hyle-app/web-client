import { balanceEntity } from '&entities/balance';
import { goalEntity } from '&entities/goal';
import { BalanceCategory } from '&shared/constants';
import { BarChart } from '&shared/ui/bar-chart/component';
import { Button } from '&shared/ui/button';
import { Icon } from '&shared/ui/icon';
import { RadarChart } from '&shared/ui/radar-chart/component';
import { useUnit } from 'effector-react';

export function BalancePage() {
	const { balance } = useUnit({
		balance: balanceEntity.outputs.$normalizedBalance
	});

	return (
		<div className="flex h-full w-full grow flex-col px-8">
			<div className="mb-3 flex justify-end gap-4">
				<Button appearance="ghost" className="min-w-[227px]">
					Обнулить
				</Button>
				<Button appearance="primary" className="min-w-[227px]">
					Рассчитать баланс
				</Button>
				<button>
					<Icon name="help" className="h-5 w-5 text-color-gray-50" />
				</button>
			</div>
			<div className="grid grow grid-cols-2 content-center items-stretch">
				<RadarChart<BalanceCategory> getLabel={goalEntity.lib.getCategoryLabel} data={balance} />
				<BarChart<BalanceCategory> getLabel={goalEntity.lib.getCategoryLabel} data={balance} />
			</div>
		</div>
	);
}
