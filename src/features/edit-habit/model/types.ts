import type { HabitFormValues, HabitId } from '&entities/habit';

export type EditHabitPayload = {
	habitId: HabitId;
	formValues: HabitFormValues;
};
