import { TimeUnit, timeService } from '&shared/services/time';
import dayjs from 'dayjs';
import { ReminderRepeatRule } from './constants';
import { Reminder } from './types';

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

export const lib = {
	getOverdueDetailsOnDate,
	getNextTriggerDate
} as const;
