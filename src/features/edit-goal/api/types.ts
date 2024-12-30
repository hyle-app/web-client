export type GoalSteps = {
	count: number;
	currentCount: number;
	rate: string;
};

export type EditGoalDTO = {
	goalId: string;
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

export type EditGoalParams = {
	goalId: string;
	goal: EditGoalDTO;
};
