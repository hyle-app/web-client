import { Goal } from '&entities/goal';
import { EditGoalDTO } from '../api';

export function mapGoalToDto(goal: Goal): EditGoalDTO {
	return {
		goalId: goal.id,
		title: goal.title,
		expiredAt: goal.targetDate,
		description: goal.description || '',
		emoji: goal.emoji || '',
		steps: {
			count: goal.progress.targetProgress || 1,
			currentCount: goal.progress.currentProgress || 0,
			rate: goal.progress.label || ''
		},
		category: goal.category,
		weight: goal.weight,
		entitiesToLink: {
			tasks: [],
			reminders: [],
			habits: []
		}
	};
}
