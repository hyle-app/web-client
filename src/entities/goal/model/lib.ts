import { BalanceCategory } from '&shared/constants';

export function getCategoryLabel(category: BalanceCategory): string {
	return {
		[BalanceCategory.Hobby]: 'Хобби',
		[BalanceCategory.Family]: 'Семья',
		[BalanceCategory.Career]: 'Карьера',
		[BalanceCategory.Health]: 'Здоровье',
		[BalanceCategory.Finance]: 'Финансы',
		[BalanceCategory.Friends]: 'Друзья'
	}[category];
}
