import { Habit } from '&entities/habit';
import { HabitDTO } from '../api';

export function mapHabitToDTO(habit: Habit): HabitDTO {
	return {
		title: habit.title,
		description: habit.description ?? undefined,
		linkedGoal: habit.linkedGoalId ? { id: habit.linkedGoalId, title: '' } : null,
		progress: habit.currentProgress,
		progressMax: habit.targetProgress,
		penalty: habit.penalty ?? 1,
		rule: habit.repeatRule,
		emoji: habit.emoji ?? '',
		remindAt: habit.remindAt ?? undefined,
		steps: {
			count: habit.dailyTargetProgressDetails?.targetProgress?.toString() ?? undefined,
			rate: habit.dailyTargetProgressDetails?.label ?? undefined
		},
		habitId: habit.id,
		completions: habit.completions,
		progressedSteps: habit.dailyProgressSnaphots
	};
}
