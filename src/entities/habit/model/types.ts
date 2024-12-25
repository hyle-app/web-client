import { HabitFormFieldName, HabitRepeatRule } from './constants';

export type HabitId = string;
export type HabitLinkedGoalId = string;

type DailyHabitTargetProgressDetails = {
	targetProgress: number;
	label: string | null;
};

export type Habit = {
	id: HabitId;
	title: string;
	createdAt: number;
	completedAt: number | null;
	description: string | null;
	linkedGoalId: HabitLinkedGoalId | null;
	penalty: number;
	repeatRule: HabitRepeatRule[];
	emoji: string | null;
	remindAt: number | null;

	currentProgress: number;
	targetProgress: number;

	dailyProgressSnaphots: Record<number, number>;
	dailyTargetProgressDetails: DailyHabitTargetProgressDetails | null;

	completions: number[];
};

export type DeleteHabitPayload = {
	habitId: HabitId;
};

export type UpdateHabitPayload = {
	habit: Habit;
};

export type HabitFormValues = {
	[HabitFormFieldName.Title]: string;
	[HabitFormFieldName.Description]: string | null;
	[HabitFormFieldName.TotalRepeatCount]: number;
	[HabitFormFieldName.Penalty]: number | null;
	[HabitFormFieldName.RepeatRule]: HabitRepeatRule[];
	[HabitFormFieldName.DailyTargetProgress]: number | null;
	[HabitFormFieldName.DailyTargetProgressLabel]: string | null;
	[HabitFormFieldName.ReminderTime]: number | null;
	[HabitFormFieldName.Emoji]: string | null;
	[HabitFormFieldName.LinkedGoalId]: HabitLinkedGoalId | null;
};
