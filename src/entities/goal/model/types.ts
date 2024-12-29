import { BalanceCategory } from '&shared/constants';
import { GoalFormFieldName } from './constants';

export type GoalId = string;

export type GoalProgress = {
	targetProgress: number;
	currentProgress: number;
	label: string | null;
};

export type Goal = {
	id: GoalId;
	title: string;
	createdAt: number;
	targetDate: number;
	completedAt: number | null;
	description: string | null;
	emoji: string | null;
	progress: GoalProgress;
	category: BalanceCategory;
	weight: number;
};

export type GoalFormValues = {
	[GoalFormFieldName.Title]: string;
	[GoalFormFieldName.Category]: BalanceCategory;
	[GoalFormFieldName.Description]: string | null;
	[GoalFormFieldName.Emoji]: string | null;
	[GoalFormFieldName.Weight]: number;
	[GoalFormFieldName.TargetDate]: number;
	[GoalFormFieldName.ProgressDetailsCount]: number | null;
	[GoalFormFieldName.ProgressDetailsLabel]: string | null;
	[GoalFormFieldName.LinkedEntities]: {
		taskIds: string[];
		reminderIds: string[];
		habitIds: string[];
	};
};

export type DeleteGoalPayload = {
	goalId: GoalId;
};

export type UpdateGoalPayload = {
	goalId: GoalId;
	goal: Goal;
};
