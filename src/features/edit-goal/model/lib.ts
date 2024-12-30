import { Goal, GoalFormFieldName, GoalFormValues } from '&entities/goal';
import { BalanceCategory } from '&shared/constants';
import { z } from 'zod';

export function getDefaultFormValues(initialGoal: Goal): GoalFormValues {
	return {
		[GoalFormFieldName.Title]: initialGoal.title,
		[GoalFormFieldName.Description]: initialGoal.description,
		[GoalFormFieldName.Category]: initialGoal.category,
		[GoalFormFieldName.TargetDate]: initialGoal.targetDate,
		[GoalFormFieldName.Emoji]: initialGoal.emoji,
		[GoalFormFieldName.Weight]: initialGoal.weight,
		[GoalFormFieldName.ProgressDetailsCount]: initialGoal.progress.targetProgress,
		[GoalFormFieldName.ProgressDetailsLabel]: initialGoal.progress.label,
		[GoalFormFieldName.LinkedEntities]: {
			taskIds: [],
			reminderIds: [],
			habitIds: []
		}
	};
}

export function getFormValidator(initialGoal: Goal, minDate: Date) {
	return z.object({
		[GoalFormFieldName.Title]: z.string().min(1, 'Укажи название цели'),
		[GoalFormFieldName.Description]: z.string().nullable(),
		[GoalFormFieldName.Category]: z.nativeEnum(BalanceCategory),
		[GoalFormFieldName.TargetDate]: z
			.number()
			.int()
			.refine(
				(value) => value >= minDate.getTime() || value === initialGoal.targetDate,
				'Введи дату не ранее сегодняшнего дня'
			),
		[GoalFormFieldName.Emoji]: z.string().nullable(),
		[GoalFormFieldName.Weight]: z.number().int().min(1, 'Вес цели должен быть больше 0'),
		[GoalFormFieldName.ProgressDetailsCount]: z.coerce.number().int().nullable(),
		[GoalFormFieldName.ProgressDetailsLabel]: z.string().nullable(),
		[GoalFormFieldName.LinkedEntities]: z.object({
			taskIds: z.array(z.string()),
			reminderIds: z.array(z.string()),
			habitIds: z.array(z.string())
		})
	});
}
