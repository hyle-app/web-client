import { GoalId } from '&entities/goal/model/types';

export type FillComplexGoalProgressPayload = {
	goalId: GoalId;
	progressDelta: number;
};

export type CompleteSimpleGoalPayload = {
	goalId: GoalId;
};

export type GoalCompletionChangedPayload = {
	goalId: GoalId;
	progress: {
		old: number;
		new: number;
		target: number;
	};
	label?: string;
};
