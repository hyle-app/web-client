import { BalanceCategory } from '&shared/constants';
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
		progress: {
			...goal.progress,
			targetProgress: formValues[GoalFormFieldName.ProgressDetailsCount] || 1,
			label: formValues[GoalFormFieldName.ProgressDetailsLabel]
		},
		category: formValues[GoalFormFieldName.Category],
		weight: formValues[GoalFormFieldName.Weight]
	};
}

export const lib = {
	getCategoryLabel,
	updateGoalWithFormValues
};
