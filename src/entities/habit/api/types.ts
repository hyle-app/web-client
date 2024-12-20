export type HabitLinkedGoal = {
	id: number;
	title: string;
};

export type HabitSteps = {
	count: number;
	rate: string;
};

export type HabitDTO = {
	locked: boolean;
	habitId: string;
	title: string;
	createdAt: number;
	completedAt: number | null;
	deletedAt: number;
	description: string;
	linkedGoal: HabitLinkedGoal | null;
	progress: number;
	progressMax: number;
	completions: number[];
	progressedSteps: Record<number, number>;
	penalty: number;
	steps: HabitSteps;
	rule: ('MONDAY' | 'TUESDAY' | 'WEDNESDAY' | 'THURSDAY' | 'FRIDAY' | 'SATURDAY' | 'SUNDAY')[];
	paused: boolean;
	emoji: string;
	remindAt?: number;
};

export type FetchHabitsOfDayParams = {
	customerId: string;
	dateTimestamp: number;
};
