import { Habit } from '&entities/habit';
import { HabitDTO } from '../api';

export function mapHabitToDTO(habit: Habit, customerId: string): HabitDTO {
	return {
		habitId: habit.id,
		customerId,
		completions: habit.completions,
		completedAt: habit.completedAt ?? undefined,
		progress: habit.currentProgress,
		progressedSteps: habit.dailyProgressSnaphots
	};
}
