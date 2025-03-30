import { HabitId } from '&entities/habit';

export type HabitDTO = {
	habitId: HabitId;
	customerId: string;
	completions: number[];
	completedAt?: number;
	progress: number;
	progressedSteps: {
		performed: number;
		currentCount: string;
	}[];
};

export type CompleteHabitParams = {
	customerId: string;
	habit: HabitDTO;
};
