import { ReminderFormFieldName, ReminderFormValues } from '&entities/reminder/model';
import { ReminderRepeatRule } from '&entities/reminder/model/constants';
import { timeService } from '&shared/services/time';
import { z } from 'zod';

export function getDefaultFormValues(timestamp: number): ReminderFormValues {
	const isToday = timeService.lib.isToday(timestamp);
	let targetTime = 0;

	if (isToday) {
		const timeStep = timeService.lib.MINUTE * 30;
		targetTime = Math.min(
			timeService.lib.getCurrentTimestamp() -
				timeService.lib.getStartOfTheDay(timeService.lib.getCurrentTimestamp()) +
				timeStep,
			timeService.lib.HOUR * 24 - 1
		);
		targetTime = Math.floor(targetTime / timeStep) * timeStep;
	}
	return {
		[ReminderFormFieldName.Title]: '',
		[ReminderFormFieldName.Description]: null,
		[ReminderFormFieldName.TargetDate]: timeService.lib.getStartOfTheDay(timestamp),
		[ReminderFormFieldName.TargetTime]: targetTime,
		[ReminderFormFieldName.RepeatRule]: ReminderRepeatRule.Never,
		[ReminderFormFieldName.LinkedGoalId]: null
	};
}

export function getFormValidatorScheme(minDateTime: Date) {
	const minDateStart = timeService.lib.getStartOfTheDay(minDateTime.getTime());
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
			const startOfTargetDate = timeService.lib.getStartOfTheDay(values[ReminderFormFieldName.TargetDate]);

			if (startOfTargetDate < minDateStart) {
				ctx.addIssue({
					path: [ReminderFormFieldName.TargetDate],
					message: 'Дата напоминания не может быть раньше сегодняшнего дня',
					code: z.ZodIssueCode.custom
				});
			}

			if (
				startOfTargetDate === minDateStart &&
				values[ReminderFormFieldName.TargetTime] < minDateTime.getTime() - minDateStart
			) {
				ctx.addIssue({
					path: [ReminderFormFieldName.TargetTime],
					message: 'Ты не можешь поставить напоминание в прошлое',
					code: z.ZodIssueCode.custom
				});
			}
		});
}
