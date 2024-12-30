import { BalanceCategory } from '&shared/constants';
import { Balance } from './types';

export function getInitialBalance(): Balance {
	return {
		[BalanceCategory.Friends]: 0,
		[BalanceCategory.Family]: 0,
		[BalanceCategory.Career]: 0,
		[BalanceCategory.Hobby]: 0,
		[BalanceCategory.Health]: 0,
		[BalanceCategory.Finance]: 0
	};
}
