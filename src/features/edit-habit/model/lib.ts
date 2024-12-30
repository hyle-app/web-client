import { Habit, HabitFormFieldName, HabitFormValues } from '&entities/habit';
import { HabitRepeatRule } from '&entities/habit/model/constants';
import { timeService } from '&shared/services/time';
import { z } from 'zod';

export function getDefaultFormValues(habit: Habit): HabitFormValues {
	return {
		[HabitFormFieldName.Title]: habit.title,
		[HabitFormFieldName.Description]: habit.description,
		[HabitFormFieldName.TotalRepeatCount]: habit.targetProgress,
		[HabitFormFieldName.Penalty]: habit.penalty,
		[HabitFormFieldName.RepeatRule]: habit.repeatRule,
		[HabitFormFieldName.DailyTargetProgress]: habit.dailyTargetProgressDetails?.targetProgress ?? null,
		[HabitFormFieldName.DailyTargetProgressLabel]: habit.dailyTargetProgressDetails?.label ?? null,
		[HabitFormFieldName.ReminderTime]: habit.remindAt,
		[HabitFormFieldName.Emoji]: habit.emoji,
		[HabitFormFieldName.LinkedGoalId]: habit.linkedGoalId
	};
}

export function getFormValidator() {
	return z.object({
		[HabitFormFieldName.Title]: z.string().min(1, 'Укажи название привычки'),
		[HabitFormFieldName.Description]: z.string().nullable(),
		[HabitFormFieldName.TotalRepeatCount]: z.coerce
			.number({
				required_error: 'Укажи количество повторений'
			})
			.min(21, 'Минимальное количество повторений - 21'),
		[HabitFormFieldName.Penalty]: z.coerce
			.number()
			.min(1, 'Количество повторений должно быть положительным')
			.nullable(),
		[HabitFormFieldName.RepeatRule]: z.array(z.nativeEnum(HabitRepeatRule)).min(1, 'Выбери хотя бы один день'),
		[HabitFormFieldName.DailyTargetProgress]: z.coerce
			.number()
			.min(2, 'Количество повторений должно быть не меньше 2')
			.nullable(),
		[HabitFormFieldName.DailyTargetProgressLabel]: z.string().nullable(),
		[HabitFormFieldName.ReminderTime]: z.coerce
			.number()
			.min(0, 'Время напоминания не может быть меньше 0')
			.max(timeService.lib.HOUR * 24, 'Выбери время напоминания в рамках одного дня')
			.nullable(),
		[HabitFormFieldName.Emoji]: z.string().nullable(),
		[HabitFormFieldName.LinkedGoalId]: z.string().nullable()
	});
}