import { GoalId } from '&entities/goal/model/types';

export type UpdateGoalCompletionDTO = {
	goalId: GoalId;
	completedAt: number | null;
	steps: {
		count: number;
		currentCount: number;
		rate: string;
	};
};

export type UpdateGoalCompletionParams = {
	goalId: GoalId;
	goal: UpdateGoalCompletionDTO;
};
