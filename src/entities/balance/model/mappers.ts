import { BalanceCategory } from '&shared/constants';
import { BalanceDTO } from '../api';
import { Balance } from './types';

export function mapDtoToBalance(dto: BalanceDTO): Balance {
	return Object.fromEntries(
		Object.entries(dto)
			.filter(([key]) => key in Object.values(BalanceCategory))
			.map(([key, value]) => [key as BalanceCategory, Number(value)])
	) as Balance;
}
