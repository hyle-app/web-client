import { GoalId } from '&entities/goal/model/types';

export type FillComplexGoalProgressPayload = {
	goalId: GoalId;
	progressDelta: number;
};

export type CompleteSimpleGoalPayload = {
	goalId: GoalId;
};
