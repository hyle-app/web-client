import { GoalFormFieldName, GoalFormValues } from '&entities/goal';
import { BalanceCategory } from '&shared/constants';
import { z } from 'zod';

export function getDefaultFormValues(minDate: Date): GoalFormValues {
	return {
		[GoalFormFieldName.Title]: '',
		[GoalFormFieldName.Description]: null,
		[GoalFormFieldName.Category]: BalanceCategory.Career,
		[GoalFormFieldName.TargetDate]: minDate.getTime(),
		[GoalFormFieldName.Emoji]: null,
		[GoalFormFieldName.Weight]: 1,
		[GoalFormFieldName.ProgressDetailsCount]: null,
		[GoalFormFieldName.ProgressDetailsLabel]: null,
		[GoalFormFieldName.LinkedEntities]: {
			taskIds: [],
			reminderIds: [],
			habitIds: []
		}
	};
}

export function getFormValidator(minDate: Date) {
	return z.object({
		[GoalFormFieldName.Title]: z.string().min(1, 'Укажи название цели'),
		[GoalFormFieldName.Description]: z.string().nullable(),
		[GoalFormFieldName.Category]: z.nativeEnum(BalanceCategory),
		[GoalFormFieldName.TargetDate]: z.number().int().min(minDate.getTime(), 'Введи дату не ранее сегодняшнего дня'),
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
