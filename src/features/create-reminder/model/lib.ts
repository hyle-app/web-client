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

export function getFormValidatorScheme() {
	return z.object({
		[ReminderFormFieldName.Title]: z.string().min(1, 'Введи название напоминания'),
		[ReminderFormFieldName.Description]: z.string().nullable(),
		[ReminderFormFieldName.TargetDate]: z.number().int(),
		[ReminderFormFieldName.TargetTime]: z.number().int(),
		[ReminderFormFieldName.RepeatRule]: z.nativeEnum(ReminderRepeatRule),
		[ReminderFormFieldName.LinkedGoalId]: z.string().nullable()
	});
}
