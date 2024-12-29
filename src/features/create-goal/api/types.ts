export type GoalSteps = {
	count: number;
	currentCount: number;
	rate: string;
};

export type CreateGoalDTO = {
	title: string;
	expiredAt: number;
	description: string;
	emoji: string;
	steps: Partial<GoalSteps>;
	category: string;
	weight: number;
	entitiesToLink: {
		tasks: string[];
		reminders: string[];
		habits: string[];
	};
};

export type CreateGoalParams = {
	goal: CreateGoalDTO;
};

export type GoalDTO = {
	customerId: number;
	goalId: number;
	title: string;
	createdAt: number;
	expiredAt: number;
	completedAt: number | null;
	description: string;
	emoji: string;
	steps: GoalSteps;
	category: string;
	weight: number;
	locked: boolean;
};
