import { Habit } from '&entities/habit';
import { HabitDTO } from '../api';

function transformProgressedSteps(habit: Habit): HabitDTO['progressedSteps'] {
	return Object.entries(habit.dailyProgressSnaphots).map(([timestamp, value]) => ({
		performed: Number(timestamp),
		currentCount: String(value)
	}));
}

export function mapHabitToDTO(habit: Habit, customerId: string): HabitDTO {
	return {
		habitId: habit.id,
		customerId,
		completions: habit.completions,
		completedAt: habit.completedAt ?? undefined,
		progress: habit.currentProgress,
		progressedSteps: transformProgressedSteps(habit)
	};
}
