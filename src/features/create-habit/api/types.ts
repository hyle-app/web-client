export type HabitLinkedGoal = {
	id: string;
	title: string;
};

export type HabitSteps = {
	count?: string;
	rate?: string;
};
export type CreateHabitParams = {
	customerId: string;
	habit: HabitDTO;
};

export type HabitDTO = {
	customerId: string;
	title: string;
	completedAt: number | null;
	description?: string;
	linkedGoal: { id: string; title: string } | null;
	progressMax: number;
	penalty: number;
	rule: ('MONDAY' | 'TUESDAY' | 'WEDNESDAY' | 'THURSDAY' | 'FRIDAY' | 'SATURDAY' | 'SUNDAY')[];
	emoji: string;
	remindAt?: number;
	steps: HabitSteps;
};

export type CreateHabitResponse = {
	habitId: string;
	customerId: string;
	title: string;
	createdAt: number;
	completedAt: number | null;
	deletedAt: number | null;
	description: string;
	linkedGoal: { id: string; title: string } | null;
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
