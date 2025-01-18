import { BalanceCategory } from '&shared/constants';
import { BalanceDTO } from '../api';
import { Balance } from './types';

export function mapDtoToBalance(dto: BalanceDTO): Balance {
	return Object.fromEntries(
		Object.entries(dto)
			.filter(([key]) => Object.values(BalanceCategory).includes(key as BalanceCategory))
			.map(([key, value]) => [key as BalanceCategory, Math.max(Number(value), 1)])
	) as Balance;
}
