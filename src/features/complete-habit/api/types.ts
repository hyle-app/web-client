import { HabitId } from '&entities/habit';

export type HabitDTO = {
	habitId: HabitId;
	customerId: string;
	completions: number[];
	completedAt: number | undefined;
	progress: number;
	progressedSteps: Record<number, number>;
};

export type CompleteHabitParams = {
	customerId: string;
	habit: HabitDTO;
};
