export type HabitLinkedGoal = {
	id: string;
	title: string;
};

export type HabitSteps = {
	count: string | undefined;
	rate: string | undefined;
};
export type EditHabitParams = {
	customerId: string;
	habit: HabitDTO;
};

export type HabitDTO = {
	habitId: string;
	title: string;
	description: string | undefined;
	linkedGoal: { id: string; title: string } | null;
	progress: number;
	progressMax: number;
	completions: number[];
	progressedSteps: Record<number, number>;
	penalty: number;
	steps: HabitSteps;
	rule: ('MONDAY' | 'TUESDAY' | 'WEDNESDAY' | 'THURSDAY' | 'FRIDAY' | 'SATURDAY' | 'SUNDAY')[];
	emoji: string;
	remindAt: number | undefined;
};
