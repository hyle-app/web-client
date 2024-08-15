import { HabitRepeatRule } from './constants';

export type HabitId = string;
export type HabitLinkedGoalId = string;

type DailyHabitTargetProgressDetails = {
	targetProgress: number;
	label: string;
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
