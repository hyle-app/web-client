import { HabitId } from '&entities/habit';

export type CompleteSimpleHabitPayload = {
	habitId: HabitId;
};

export type CompleteComplexHabitPayload = {
	habitId: HabitId;
	progressDelta: number;
};

export type HabitCompletedOnDayPayload = {
	habitId: HabitId;
	totalProgress: {
		old: number;
		new: number;
		target: number;
	};
};

export type HabitPartiallyCompletedOnDayPayload = {
	dailyProgress: {
		old: number;
		new: number;
		target: number;
	};
};
