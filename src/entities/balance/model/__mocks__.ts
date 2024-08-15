import { BalanceCategory } from '&shared/constants';

export function getRandomBalanceState(): Record<BalanceCategory, number> {
	return {
		[BalanceCategory.Hobby]: Math.floor(Math.random() * 11),
		[BalanceCategory.Family]: Math.floor(Math.random() * 11),
		[BalanceCategory.Career]: Math.floor(Math.random() * 11),
		[BalanceCategory.Health]: Math.floor(Math.random() * 11),
		[BalanceCategory.Finance]: Math.floor(Math.random() * 11),
		[BalanceCategory.Friends]: Math.floor(Math.random() * 11)
	};
}
