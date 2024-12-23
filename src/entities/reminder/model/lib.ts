import { TimeUnit, timeService } from '&shared/services/time';
import dayjs from 'dayjs';
import { ReminderFormFieldName, ReminderRepeatRule } from './constants';
import { Reminder, ReminderFormValues } from './types';

export function getOverdueDetailsOnDate(
	reminder: Pick<Reminder, 'targetDateTime' | 'rule' | 'completions'>,
	viewDate: number,
	realTimestamp: number
): null | {
	unit: TimeUnit;
	value: number;
} {
	const isViewingFuture = viewDate > realTimestamp;

	if (isViewingFuture) {
		return null;
	}

	const selectedDateStart = timeService.lib.getStartOfTheDay(viewDate);

	const lastTriggerTimestamp = getLastTriggerDateBefore(reminder, selectedDateStart);
	const lastTriggerDateStart = timeService.lib.getStartOfTheDay(lastTriggerTimestamp);

	const isViewingTriggerDate = lastTriggerDateStart === selectedDateStart;

	if (isViewingTriggerDate) {
		const viewDateCompletion =
			reminder.completions?.find((completion) => timeService.lib.getStartOfTheDay(completion) === selectedDateStart) ??
			null;

		const isExpiredOnTriggerDate =
			viewDateCompletion === null && reminder.targetDateTime < timeService.lib.getCurrentTimestamp();

		if (isExpiredOnTriggerDate) {
			return timeService.lib.getDiffInTimeUnits(reminder.targetDateTime, timeService.lib.getCurrentTimestamp());
		}

		const isExpiredOnLastTriggerDate = viewDateCompletion !== null && viewDateCompletion > lastTriggerTimestamp;

		if (isExpiredOnLastTriggerDate) {
			return timeService.lib.getDiffInTimeUnits(reminder.targetDateTime, lastTriggerTimestamp);
		}
	}

	return null;
}

export function getNextTriggerDate(anchorDate: number, rule: ReminderRepeatRule): number {
	const typeMap = {
		[ReminderRepeatRule.EveryWeek]: 'week',
		[ReminderRepeatRule.EveryMonth]: 'month',
		[ReminderRepeatRule.EveryYear]: 'year'
	} as const;

	if (rule === ReminderRepeatRule.Never) {
		return anchorDate;
	}

	return dayjs(anchorDate).add(1, typeMap[rule]).toDate().getTime();
}

export function getPreviousTriggerDate(anchorDate: number, rule: ReminderRepeatRule): number {
	const typeMap = {
		[ReminderRepeatRule.EveryWeek]: 'week',
		[ReminderRepeatRule.EveryMonth]: 'month',
		[ReminderRepeatRule.EveryYear]: 'year'
	} as const;

	if (rule === ReminderRepeatRule.Never) {
		return anchorDate;
	}

	return dayjs(anchorDate).subtract(1, typeMap[rule]).toDate().getTime();
}

export function getLastTriggerDateBefore(
	reminder: Pick<Reminder, 'rule' | 'targetDateTime'>,
	viewTimestamp: number
): number {
	const viewDate = new Date(viewTimestamp);

	const currentTriggerTimestamp: number = reminder.targetDateTime;
	const repeatRule: ReminderRepeatRule = reminder.rule;
	const currentTriggerDateObject = new Date(currentTriggerTimestamp);

	if (repeatRule === ReminderRepeatRule.Never) {
		return currentTriggerTimestamp;
	}

	if (repeatRule === ReminderRepeatRule.EveryWeek) {
		const convertWeekdayToJsFormat = (n: number) => {
			if (n === 0) {
				return 6;
			} else {
				return n - 1;
			}
		};
		const expirationWeekday = convertWeekdayToJsFormat(currentTriggerDateObject.getDay());
		const currentWeekday = convertWeekdayToJsFormat(viewDate.getDay());

		if (expirationWeekday === currentWeekday) {
			return viewDate.setHours(
				currentTriggerDateObject.getHours(),
				currentTriggerDateObject.getMinutes(),
				currentTriggerDateObject.getSeconds(),
				currentTriggerDateObject.getMilliseconds()
			);
		}

		const dt =
			expirationWeekday > currentWeekday
				? 7 - (expirationWeekday - currentWeekday)
				: currentWeekday - expirationWeekday;

		return dayjs(viewDate)
			.subtract(dt, 'day')
			.toDate()
			.setHours(
				currentTriggerDateObject.getHours(),
				currentTriggerDateObject.getMinutes(),
				currentTriggerDateObject.getSeconds(),
				currentTriggerDateObject.getMilliseconds()
			);
	}

	if (repeatRule === ReminderRepeatRule.EveryMonth) {
		const expirationDay = currentTriggerDateObject.getDate();
		const currentDay = viewDate.getDate();

		if (currentDay === expirationDay) {
			return viewDate.setHours(
				currentTriggerDateObject.getHours(),
				currentTriggerDateObject.getMinutes(),
				currentTriggerDateObject.getSeconds(),
				currentTriggerDateObject.getMilliseconds()
			);
		}

		// trigger date has already passed on this month
		if (currentDay > expirationDay) {
			return dayjs(viewDate)
				.set('date', expirationDay)
				.toDate()
				.setHours(
					currentTriggerDateObject.getHours(),
					currentTriggerDateObject.getMinutes(),
					currentTriggerDateObject.getSeconds(),
					currentTriggerDateObject.getMilliseconds()
				);
		}

		// trigger date has not come yet on this month
		return dayjs(viewDate)
			.set('date', expirationDay)
			.subtract(1, 'month')
			.toDate()
			.setHours(
				currentTriggerDateObject.getHours(),
				currentTriggerDateObject.getMinutes(),
				currentTriggerDateObject.getSeconds(),
				currentTriggerDateObject.getMilliseconds()
			);
	}

	if (repeatRule === ReminderRepeatRule.EveryYear) {
		const expirationDay = currentTriggerDateObject.getDate();
		const currentDay = viewDate.getDate();
		const expirationMonth = currentTriggerDateObject.getMonth();
		const currentMonth = viewDate.getMonth();

		if (currentDay === expirationDay && expirationMonth === currentMonth) {
			return viewDate.setHours(
				currentTriggerDateObject.getHours(),
				currentTriggerDateObject.getMinutes(),
				currentTriggerDateObject.getSeconds(),
				currentTriggerDateObject.getMilliseconds()
			);
		}

		// trigger date has already passed on this month
		if (currentMonth > expirationMonth) {
			return dayjs(viewDate)
				.set('month', expirationMonth)
				.set('date', expirationDay)
				.toDate()
				.setHours(
					currentTriggerDateObject.getHours(),
					currentTriggerDateObject.getMinutes(),
					currentTriggerDateObject.getSeconds(),
					currentTriggerDateObject.getMilliseconds()
				);
		}

		// trigger date has not come yet on this year
		return dayjs(viewDate)
			.set('month', expirationMonth)
			.set('date', expirationDay)
			.subtract(1, 'year')
			.toDate()
			.setHours(
				currentTriggerDateObject.getHours(),
				currentTriggerDateObject.getMinutes(),
				currentTriggerDateObject.getSeconds(),
				currentTriggerDateObject.getMilliseconds()
			);
	}

	return currentTriggerTimestamp;
}

function isReminderAttachedToDay(reminder: Reminder, realTimestamp: number, timestamp: number): boolean {
	const startOfTargetDate = timeService.lib.getStartOfTheDay(reminder.targetDateTime);
	const startOfCheckedTimestamp = timeService.lib.getStartOfTheDay(timestamp);
	const startOfRealTimestamp = timeService.lib.getStartOfTheDay(realTimestamp);
	const startOfDayReminderWasCreated = timeService.lib.getStartOfTheDay(reminder.createdAt);

	if (startOfDayReminderWasCreated > startOfCheckedTimestamp) return false;

	// Planned on checked day
	if (startOfCheckedTimestamp === startOfTargetDate) return true;

	// Show overdue reminders on TODAY view
	const lastCompletion = reminder.completions?.[reminder.completions.length - 1] ?? null;
	if (
		lastCompletion === null &&
		startOfTargetDate === startOfCheckedTimestamp &&
		startOfRealTimestamp === startOfCheckedTimestamp
	)
		return true;

	if (reminder.rule === ReminderRepeatRule.EveryWeek) {
		return timeService.lib.getDayOfWeek(startOfTargetDate) === timeService.lib.getDayOfWeek(startOfCheckedTimestamp);
	}

	if (reminder.rule === ReminderRepeatRule.EveryMonth) {
		return new Date(reminder.targetDateTime).getDate() === new Date(timestamp).getDate();
	}

	if (reminder.rule === ReminderRepeatRule.EveryYear) {
		return (
			new Date(reminder.targetDateTime).getMonth() === new Date(timestamp).getMonth() &&
			new Date(reminder.targetDateTime).getDate() === new Date(timestamp).getDate()
		);
	}

	return false;
}

function updateReminderWithFormValues(reminder: Reminder, formValues: ReminderFormValues): Reminder {
	return {
		...reminder,
		title: formValues[ReminderFormFieldName.Title],
		description: formValues[ReminderFormFieldName.Description],
		targetDateTime: new Date(formValues[ReminderFormFieldName.TargetDate]).setMilliseconds(
			formValues[ReminderFormFieldName.TargetTime]
		),
		rule: formValues[ReminderFormFieldName.RepeatRule],
		linkedGoalId: formValues[ReminderFormFieldName.LinkedGoalId]
	};
}

function completeReminderOnDate(reminder: Reminder, timestamp: number) {
	const completions = reminder.completions ?? [];
	completions.push(timeService.lib.getStartOfTheDay(timestamp));

	if (reminder.rule === ReminderRepeatRule.Never) {
		return {
			...reminder,
			completions,
			completedAt: timestamp
		};
	}

	const nextTriggerDate = getNextTriggerDate(reminder.targetDateTime, reminder.rule);
	return {
		...reminder,
		completions,
		targetDateTime: nextTriggerDate,
		completedAt: timestamp
	};
}

function uncompleteReminderOnDate(reminder: Reminder, timestamp: number): Reminder {
	const completions = reminder.completions ?? [];
	const newCompletions = completions.filter(
		(completion) => timeService.lib.getStartOfTheDay(completion) !== timeService.lib.getStartOfTheDay(timestamp)
	);
	return {
		...reminder,
		completions: newCompletions,
		completedAt: null,
		targetDateTime: getPreviousTriggerDate(reminder.targetDateTime, reminder.rule)
	};
}

export function isReminderCompletedOnDay(reminder: Reminder, timestamp: number): boolean {
	const potentialCompletionDateStart = timeService.lib.getStartOfTheDay(timestamp);
	return (
		reminder.completions?.some(
			(completion) => timeService.lib.getStartOfTheDay(completion) === potentialCompletionDateStart
		) ?? false
	);
}

export const lib = {
	getOverdueDetailsOnDate,
	getNextTriggerDate,
	isReminderAttachedToDay,
	updateReminderWithFormValues,
	completeReminderOnDate,
	uncompleteReminderOnDate,
	isReminderCompletedOnDay
} as const;
