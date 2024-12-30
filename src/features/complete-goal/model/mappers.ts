import { Goal } from '&entities/goal';
import { UpdateGoalCompletionDTO } from '../api';

export function mapGoalToDTO(goal: Goal): UpdateGoalCompletionDTO {
	return {
		goalId: goal.id,
		completedAt: goal.completedAt,
		steps: {
			count: goal.progress?.targetProgress || 0,
			currentCount: goal.progress?.currentProgress || 0,
			rate: goal.progress?.label || ''
		}
	};
}
