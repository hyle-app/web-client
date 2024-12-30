export type GoalSteps = {
	count: number;
	currentCount: number;
	rate: string;
};

export type GoalDTO = {
	goal: {
		customerId: number;
		goalId: number;
		title: string;
		createdAt: number;
		expiredAt: number;
		completedAt: number | null;
		description: string;
		emoji: string;
		steps: GoalSteps | null;
		category: string;
		weight: number;
		locked: boolean;
	};
};

export type FetchGoalsParams = {
	customerId: string;
};

export type DeleteGoalParams = {
	goalId: string;
	customerId: string;
};
