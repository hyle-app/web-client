import type { GoalFormValues, GoalId } from '&entities/goal/model/types';

export type EditGoalPayload = {
	goalId: GoalId;
	formValues: GoalFormValues;
};
