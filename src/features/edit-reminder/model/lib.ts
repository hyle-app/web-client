import { Reminder, ReminderFormFieldName, ReminderFormValues, ReminderRepeatRule } from '&entities/reminder/model';
import { timeService } from '&shared/services/time';
import { z } from 'zod';

export function getDefaultFormValues(reminder: Reminder): ReminderFormValues {
	const targetDate = timeService.lib.getStartOfTheDay(reminder.targetDateTime);

	return {
		[ReminderFormFieldName.Title]: reminder.title,
		[ReminderFormFieldName.Description]: reminder.description,
		[ReminderFormFieldName.TargetDate]: targetDate,
		[ReminderFormFieldName.TargetTime]: reminder.targetDateTime - targetDate,
		[ReminderFormFieldName.RepeatRule]: reminder.rule,
		[ReminderFormFieldName.LinkedGoalId]: reminder.linkedGoalId ?? null
	};
}

export function getFormValidatorScheme(reminder: Reminder, realTimestamp: number) {
	const minDateStart = timeService.lib.getStartOfTheDay(realTimestamp);
	return z
		.object({
			[ReminderFormFieldName.Title]: z.string().min(1, 'Введи название напоминания'),
			[ReminderFormFieldName.Description]: z.string().nullable(),
			[ReminderFormFieldName.TargetDate]: z
				.number()
				.int()
				.min(minDateStart, 'Дата напоминания не может быть раньше сегодняшнего дня'),
			[ReminderFormFieldName.TargetTime]: z
				.number({
					required_error: 'Обязательно укажи время напоминания',
					invalid_type_error: 'Обязательно укажи время напоминания'
				})
				.int()
				.min(0, 'Введи время')
				.max(timeService.lib.HOUR * 24 - 1, 'Введи время'),
			[ReminderFormFieldName.RepeatRule]: z.nativeEnum(ReminderRepeatRule, {
				invalid_type_error: 'Выбери правило повторения'
			}),
			[ReminderFormFieldName.LinkedGoalId]: z.string().nullable()
		})
		.superRefine((values, ctx) => {
			if (
				values[ReminderFormFieldName.TargetDate] + values[ReminderFormFieldName.TargetTime] !==
				reminder.targetDateTime
			) {
				const startOfTargetDate = timeService.lib.getStartOfTheDay(values[ReminderFormFieldName.TargetDate]);

				if (startOfTargetDate < realTimestamp) {
					ctx.addIssue({
						path: [ReminderFormFieldName.TargetDate],
						message: 'Дата напоминания не может быть раньше сегодняшнего дня',
						code: z.ZodIssueCode.custom
					});
				}

				if (
					startOfTargetDate === minDateStart &&
					values[ReminderFormFieldName.TargetTime] < realTimestamp - minDateStart
				) {
					ctx.addIssue({
						path: [ReminderFormFieldName.TargetTime],
						message: 'Ты не можешь поставить напоминание в прошлое',
						code: z.ZodIssueCode.custom
					});
				}
			}
		});
}
