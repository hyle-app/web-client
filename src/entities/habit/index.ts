import {
	inputs,
	isComplexHabit,
	isSimpleHabit,
	outputs,
	fillComplexHabitDayProgress,
	completeSimpleHabit,
	isHabitAttachedToDate,
	isHabitCompletedOnDate
} from './model';

export { HabitCard, HabitForm } from './ui';
export { type HabitId, type Habit, type HabitLinkedGoalId, type HabitFormValues, HabitFormFieldName } from './model';
import { updateHabitWithFormValues } from './model';

export const habitEntity = {
	outputs,
	inputs,
	lib: {
		updateHabitWithFormValues,
		isSimpleHabit,
		isComplexHabit,
		completeSimpleHabit,
		fillComplexHabitDayProgress,
		isHabitAttachedToDate,
		isHabitCompletedOnDate
	}
};
