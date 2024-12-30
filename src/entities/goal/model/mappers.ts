import { BalanceCategory } from '&shared/constants';
import { GoalDTO } from '../api';
import { Goal } from './types';

export function mapDtoToGoal(dto: GoalDTO): Goal {
	return {
		id: dto.goal.goalId.toString(),
		title: dto.goal.title,
		createdAt: dto.goal.createdAt,
		targetDate: dto.goal.expiredAt,
		completedAt: dto.goal.completedAt || null,
		description: dto.goal.description || null,
		emoji: dto.goal.emoji || null,
		progress:
			dto.goal.steps.count > 1
				? {
						targetProgress: dto.goal.steps.count,
						currentProgress: dto.goal.steps.currentCount || 0,
						label: dto.goal.steps.rate || null
					}
				: null,
		category: dto.goal.category as BalanceCategory,
		weight: dto.goal.weight || 1
	};
}
