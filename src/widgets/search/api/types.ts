export type LinkedGoalDTO = {
	id: number;
	title: string;
};

export type TaskDTO = {
	locked: boolean;
	customerId: string;
	taskId: string;
	title: string;
	createdAt: number;
	completedAt: number | null;
	taskCompletionDateRange?: [number, number | null];
	deletedAt?: number;
	description?: string;
	subtasks: Array<{
		id: number;
		title: string;
		completed: boolean;
	}>;
	linkedGoal: LinkedGoalDTO | null;
	remindAt?: number;
};

export type HabitDTO = {
	locked: boolean;
	habitId: string;
	title: string;
	createdAt: number;
	completedAt: number | null;
	deletedAt: number;
	description: string;
	linkedGoal: LinkedGoalDTO | null;
	progress: number;
	progressMax: number;
	completions: number[];
	progressedSteps: Record<number, number>;
	penalty: number;
	steps: {
		count: number;
		rate: string;
	};
	rule: ('MONDAY' | 'TUESDAY' | 'WEDNESDAY' | 'THURSDAY' | 'FRIDAY' | 'SATURDAY' | 'SUNDAY')[];
	paused: boolean;
	emoji: string;
	remindAt?: number;
};

export type ReminderDTO = {
	locked: boolean;
	customerId: number;
	reminderId: string;
	title: string;
	createdAt: number;
	expiresAt: number;
	completedAt?: number | null;
	deletedAt: number;
	description: string;
	linkedGoal: LinkedGoalDTO | null;
	completions: number[];
	expirations: number[];
	rule: 'NEVER' | 'EVERY_WEEK' | 'EVERY_MONTH' | 'EVERY_YEAR';
};

export type SearchResponseDTO = {
	tasks: unknown[];
	habits: HabitDTO[];
	reminders: ReminderDTO[];
	periodTasks: TaskDTO[];
};

export type Params = {
	query: string;
	customerId: string;
};
