import { Goal, GoalFormFieldName, GoalFormValues } from '&entities/goal';
import { BalanceCategory } from '&shared/constants';
import { CreateGoalDTO, GoalDTO } from '../api';

export function mapFormValuesToDTO(formValues: GoalFormValues, customerId: string): CreateGoalDTO {
	return {
		customerId,
		title: formValues[GoalFormFieldName.Title],
		expiredAt: formValues[GoalFormFieldName.TargetDate],
		description: formValues[GoalFormFieldName.Description] ?? '',
		emoji: formValues[GoalFormFieldName.Emoji] ?? '',
		steps: {
			count: formValues[GoalFormFieldName.ProgressDetailsCount] || 0,
			currentCount: 0,
			rate: formValues[GoalFormFieldName.ProgressDetailsLabel] || ''
		},
		category: formValues[GoalFormFieldName.Category],
		weight: formValues[GoalFormFieldName.Weight],
		entitiesToLink: {
			tasks: formValues[GoalFormFieldName.LinkedEntities].taskIds,
			reminders: formValues[GoalFormFieldName.LinkedEntities].reminderIds,
			habits: formValues[GoalFormFieldName.LinkedEntities].habitIds
		}
	};
}

export function mapDtoToGoal(dto: GoalDTO): Goal {
	return {
		id: dto.goalId.toString(),
		title: dto.title,
		createdAt: dto.createdAt,
		targetDate: dto.expiredAt,
		completedAt: dto.completedAt || null,
		description: dto.description || null,
		emoji: dto.emoji || null,
		progress:
			dto.steps && dto.steps.count > 1
				? {
						targetProgress: dto.steps.count,
						currentProgress: dto.steps.currentCount || 0,
						label: dto.steps.rate || null
					}
				: null,
		category: dto.category as BalanceCategory,
		weight: dto.weight ?? 1
	};
}
