import { BalanceCategory } from '&shared/constants';

export type GoalId = string;

export type GoalProgress = {
	targetProgress: number;
	currentProgress: number;
	label: string;
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
