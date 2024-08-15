import { ReminderRepeatRule } from './constants';

export type ReminderId = string;

export type ReminderLinkedGoalId = string;

export type Reminder = {
	id: ReminderId;
	title: string;
	createdAt: number;
	targetDateTime: number;
	completedAt: number | null;
	description: string | null;
	linkedGoalId: ReminderLinkedGoalId | null;

	completions: number[];
	expirations: number[];
	rule: ReminderRepeatRule;
};
