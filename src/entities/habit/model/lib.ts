import { timeService } from '&shared/services/time';
import { HabitFormFieldName, HabitRepeatRule } from './constants';
import { Habit, HabitFormValues } from './types';

export function repeatRuleToDayIndex(repeatRule: Habit['repeatRule']): number[] {
	const days = [
		HabitRepeatRule.Sunday,
		HabitRepeatRule.Monday,
		HabitRepeatRule.Tuesday,
		HabitRepeatRule.Wednesday,
		HabitRepeatRule.Thursday,
		HabitRepeatRule.Friday,
		HabitRepeatRule.Saturday
	];
	return repeatRule.map((rule) => days.indexOf(rule));
}

export function isHabitAttachedToDate(habit: Habit, dateTimestamp: number): boolean {
	const dateStartTimestamp = timeService.lib.getStartOfTheDay(dateTimestamp);

	const weekDaysToShowAt = repeatRuleToDayIndex(habit.repeatRule);

	return weekDaysToShowAt.includes(timeService.lib.getDayOfWeek(dateStartTimestamp));
}

export function updateHabitWithFormValues(habit: Habit, formValues: HabitFormValues): Habit {
	return {
		...habit,
		title: formValues[HabitFormFieldName.Title],
		description: formValues[HabitFormFieldName.Description] ?? null,
		targetProgress: formValues[HabitFormFieldName.TotalRepeatCount],
		penalty: formValues[HabitFormFieldName.Penalty] ?? 1,
		repeatRule: formValues[HabitFormFieldName.RepeatRule],
		emoji: formValues[HabitFormFieldName.Emoji] ?? null,
		remindAt: formValues[HabitFormFieldName.ReminderTime] ?? null,
		linkedGoalId: formValues[HabitFormFieldName.LinkedGoalId] ?? null,
		dailyTargetProgressDetails: formValues[HabitFormFieldName.DailyTargetProgress]
			? {
					targetProgress: formValues[HabitFormFieldName.DailyTargetProgress],
					label: formValues[HabitFormFieldName.DailyTargetProgressLabel] ?? null
				}
			: null
	} satisfies Habit;
}

export function completeSimpleHabit(habit: Habit, timestamp: number): Habit {
	if (habit.dailyTargetProgressDetails !== null) {
		return habit;
	}

	return {
		...habit,
		currentProgress: habit.currentProgress + 1,
		completedAt: habit.currentProgress + 1 >= habit.targetProgress ? timestamp : null,
		completions: [...habit.completions, timeService.lib.getStartOfTheDay(timestamp)],
		dailyProgressSnaphots: {
			...habit.dailyProgressSnaphots,
			[timeService.lib.getStartOfTheDay(timestamp)]: 1
		}
	};
}

export function fillComplexHabitDayProgress(habit: Habit, progressDelta: number, timestamp: number): Habit {
	if (habit.dailyTargetProgressDetails === null) {
		return habit;
	}

	const timestampStartOfDay = timeService.lib.getStartOfTheDay(timestamp);
	const currentDaySnapshot = habit.dailyProgressSnaphots[timestampStartOfDay] ?? 0;
	const newDayCompletion = Math.max(currentDaySnapshot + progressDelta, 0);
	const isCompletedForDay = newDayCompletion >= habit.dailyTargetProgressDetails.targetProgress;

	return {
		...habit,
		dailyProgressSnaphots: {
			...habit.dailyProgressSnaphots,
			[timestampStartOfDay]: newDayCompletion
		},
		currentProgress: isCompletedForDay ? habit.currentProgress + 1 : habit.currentProgress,
		completedAt: isCompletedForDay ? timestamp : habit.completedAt,
		completions: isCompletedForDay ? [...habit.completions, timestampStartOfDay] : habit.completions
	};
}

export function isSimpleHabit(habit: Habit): boolean {
	return habit.dailyTargetProgressDetails === null;
}

export function isComplexHabit(habit: Habit): boolean {
	return !isSimpleHabit(habit);
}

export function isHabitCompletedOnDate(habit: Habit, dateTimestamp: number): boolean {
	return habit.completions.includes(timeService.lib.getStartOfTheDay(dateTimestamp));
}
