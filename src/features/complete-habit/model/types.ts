import { HabitId } from '&entities/habit';

export type CompleteSimpleHabitPayload = {
	habitId: HabitId;
};

export type CompleteComplexHabitPayload = {
	habitId: HabitId;
	progressDelta: number;
};
