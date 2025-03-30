export type HabitLinkedGoal = {
	id: string;
	title: string;
};

export type HabitSteps = {
	count?: string;
	rate?: string;
};
export type EditHabitParams = {
	customerId: string;
	habit: HabitDTO;
};

export type HabitDTO = {
	habitId: string;
	title: string;
	description?: string;
	linkedGoal: { id: string; title: string } | null;
	progress: number;
	progressMax: number;
	completions: number[];
	progressedSteps: Record<number, number>;
	penalty: number;
	steps: HabitSteps;
	rule: ('MONDAY' | 'TUESDAY' | 'WEDNESDAY' | 'THURSDAY' | 'FRIDAY' | 'SATURDAY' | 'SUNDAY')[];
	emoji: string;
	remindAt?: number;
};
