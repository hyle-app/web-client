import { Habit } from '&entities/habit';
import { HabitDTO } from '../api';

export function mapHabitToDTO(habit: Habit): HabitDTO {
	return {
		habitId: habit.id,
		completions: habit.completions,
		completedAt: habit.completedAt ?? undefined,
		progress: habit.currentProgress,
		progressedSteps: habit.dailyProgressSnaphots
	};
}
