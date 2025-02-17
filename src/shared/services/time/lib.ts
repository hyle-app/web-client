import dayjs from 'dayjs';
import { TimeUnit } from './types';
import { plural } from '&shared/utils';

export function getCurrentTimestamp() {
	return Date.now();
}

export function format(time: number, format: string): string {
	return dayjs(time).format(format);
}

export function getStartOfTheDay(time: number): number {
	return new Date(time).setHours(0, 0, 0, 0);
}

export function getEndOfTheDay(time: number): number {
	return new Date(time).setHours(23, 59, 59);
}

export function getDiffInTimeUnits(
	start: number,
	end: number,
	unit?: TimeUnit
): {
	value: number;
	unit: TimeUnit;
} {
	if (unit) {
		return { value: dayjs(end).diff(start, unit), unit };
	}

	const yearsDiff = dayjs(end).diff(start, 'year');
	if (yearsDiff > 0) return { value: yearsDiff, unit: 'year' };

	const weeksDiff = dayjs(end).diff(start, 'week');
	if (weeksDiff > 0) return { value: weeksDiff, unit: 'week' };

	const daysDiff = dayjs(end).diff(start, 'day');
	if (daysDiff > 0) return { value: daysDiff, unit: 'day' };

	const hoursDiff = dayjs(end).diff(start, 'hour');
	if (hoursDiff > 0) return { value: hoursDiff, unit: 'hour' };

	const minutesDiff = dayjs(end).diff(start, 'minute');
	if (minutesDiff > 0) return { value: minutesDiff, unit: 'minute' };

	const secondsDiff = dayjs(end).diff(start, 'second');
	if (secondsDiff > 0) return { value: secondsDiff, unit: 'second' };

	return { value: 0, unit: 'second' };
}

export function getUnitLabel(unit: TimeUnit, value: number): string {
	const unitLabelMap: Record<TimeUnit, string[]> = {
		second: ['секунда', 'секунды', 'секунд'],
		minute: ['минута', 'минуты', 'минут'],
		hour: ['час', 'часа', 'часов'],
		day: ['день', 'дня', 'дней'],
		week: ['неделя', 'недели', 'недель'],
		month: ['месяц', 'месяца', 'месяцев'],
		year: ['год', 'года', 'лет']
	};

	return plural(value, unitLabelMap[unit]);
}

export function isInRange(range: [number, number], date: number) {
	return dayjs(date).isBetween(range[0], range[1]);
}

export function getDayOfWeek(date: number) {
	return dayjs(date).day();
}

export function isToday(date: number) {
	return getStartOfTheDay(date) === getStartOfTheDay(getCurrentTimestamp());
}

export function isTomorrow(date: number) {
	return getStartOfTheDay(dayjs(getCurrentTimestamp()).add(1, 'day').toDate().getTime()) === getStartOfTheDay(date);
}

export function getTomorrow(): number {
	return dayjs().add(1, 'day').toDate().getTime();
}

export function getDayAfterTomorrow(): number {
	return dayjs().add(2, 'day').toDate().getTime();
}

export const SECOND = 1000;
export const MINUTE = SECOND * 60;
export const HOUR = MINUTE * 60;
export const DAY = HOUR * 24;
export const WEEK = DAY * 7;
export const YEAR = DAY * 365;
export const LEAP_YEAR = DAY * 366;

export const lib = {
	DAY,
	HOUR,
	MINUTE,
	SECOND,
	WEEK,
	YEAR,
	LEAP_YEAR,
	format,
	getCurrentTimestamp,
	getDiffInTimeUnits,
	getStartOfTheDay,
	getUnitLabel,
	isInRange,
	getDayOfWeek,
	isToday,
	isTomorrow,
	getTomorrow,
	getDayAfterTomorrow,
	getEndOfTheDay
};
