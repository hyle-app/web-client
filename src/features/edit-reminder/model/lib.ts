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
	return z
		.object({
			[ReminderFormFieldName.Title]: z.string().min(1, 'Введи название напоминания'),
			[ReminderFormFieldName.Description]: z.string().nullable(),
			[ReminderFormFieldName.TargetDate]: z
				.number()
				.int()
				.refine((timestamp) => {
					const startOfTargetDate = timeService.lib.getStartOfTheDay(timestamp);
					const startOfRealTimestamp = timeService.lib.getStartOfTheDay(realTimestamp);

					return startOfTargetDate >= startOfRealTimestamp;
				}, 'Нельзя планировать прошлое'),
			[ReminderFormFieldName.TargetTime]: z
				.number()
				.int()
				.min(0, 'Введи время')
				.max(timeService.lib.HOUR * 24 - 1, 'Введи время'),
			[ReminderFormFieldName.RepeatRule]: z.nativeEnum(ReminderRepeatRule),
			[ReminderFormFieldName.LinkedGoalId]: z.string().nullable()
		})
		.refine((formValues) => {
			const newDateTime = formValues[ReminderFormFieldName.TargetDate] + formValues[ReminderFormFieldName.TargetTime];
			if (newDateTime < realTimestamp && newDateTime !== reminder.targetDateTime) {
				return false;
			}
			return true;
		}, 'Нельзя планировать прошлое');
}
