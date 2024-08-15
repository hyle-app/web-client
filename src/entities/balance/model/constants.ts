import { BalanceCategory } from '&shared/constants';

export const BALANCE_MAX_VALUE = 10;

export const DEFAULT_BALANCE_STATE: Record<BalanceCategory, number> = {
	[BalanceCategory.Hobby]: 0,
	[BalanceCategory.Family]: 0,
	[BalanceCategory.Career]: 0,
	[BalanceCategory.Health]: 0,
	[BalanceCategory.Finance]: 0,
	[BalanceCategory.Friends]: 0
};
