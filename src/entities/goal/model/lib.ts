import { BalanceCategory } from '&shared/constants';
import { timeService } from '&shared/services/time';
import { GoalFormFieldName } from './constants';
import { Goal, GoalFormValues } from './types';

export function getCategoryLabel(category: BalanceCategory): string {
	return {
		[BalanceCategory.Hobby]: 'Хобби',
		[BalanceCategory.Family]: 'Семья',
		[BalanceCategory.Career]: 'Карьера',
		[BalanceCategory.Health]: 'Здоровье',
		[BalanceCategory.Finance]: 'Финансы',
		[BalanceCategory.Friends]: 'Друзья'
	}[category];
}

export function updateGoalWithFormValues(goal: Goal, formValues: GoalFormValues): Goal {
	return {
		...goal,
		title: formValues[GoalFormFieldName.Title],
		targetDate: formValues[GoalFormFieldName.TargetDate],
		description: formValues[GoalFormFieldName.Description],
		emoji: formValues[GoalFormFieldName.Emoji],
		progress: formValues[GoalFormFieldName.ProgressDetailsCount]
			? {
					targetProgress: formValues[GoalFormFieldName.ProgressDetailsCount] || 1,
					label: formValues[GoalFormFieldName.ProgressDetailsLabel],
					currentProgress: goal.progress?.currentProgress || 0
				}
			: null,
		category: formValues[GoalFormFieldName.Category],
		weight: formValues[GoalFormFieldName.Weight]
	};
}

export function isComplexGoal(goal: Goal): boolean {
	if (goal.progress === null) return false;
	return Boolean(goal.progress && goal.progress.targetProgress > 1);
}

export function getGoalProgress(goal: Goal): { current: number; target: number; label?: string } {
	if (isComplexGoal(goal)) {
		return {
			current: goal.progress!.currentProgress,
			target: goal.progress!.targetProgress,
			label: goal.progress!.label || undefined
		};
	}

	return {
		current: goal.completedAt ? 1 : 0,
		target: 1,
		label: undefined
	};
}

export function fillComplexGoalProgress(goal: Goal, progressDelta: number): Goal {
	if (!isComplexGoal(goal)) return goal;

	const newProgressValue = Math.max(goal.progress!.currentProgress + progressDelta, 0);
	const newCompletionTimestamp =
		newProgressValue >= goal.progress!.targetProgress ? timeService.lib.getCurrentTimestamp() : null;

	return {
		...goal,
		completedAt: newCompletionTimestamp,
		progress: {
			...goal.progress!,
			currentProgress: newProgressValue
		}
	};
}

export function completeSimpleGoal(goal: Goal): Goal {
	if (isComplexGoal(goal)) return goal;

	return {
		...goal,
		completedAt: timeService.lib.getCurrentTimestamp()
	};
}

export function isGoalCompleted(goal: Goal): boolean {
	return goal.completedAt !== null;
}

export const lib = {
	getCategoryLabel,
	updateGoalWithFormValues,
	getGoalProgress,
	isComplexGoal,
	completeSimpleGoal,
	fillComplexGoalProgress,
	isGoalCompleted
};
