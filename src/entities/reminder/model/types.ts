import { ReminderFormFieldName, ReminderRepeatRule } from './constants';

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

export type DeleteReminderPayload = {
	reminderId: ReminderId;
};

export type UpdateReminderPayload = {
	reminderId: ReminderId;
	reminder: Reminder;
};

export type ReminderFormValues = {
	[ReminderFormFieldName.Title]: string;
	[ReminderFormFieldName.Description]: string | null;
	[ReminderFormFieldName.TargetDate]: number;
	[ReminderFormFieldName.TargetTime]: number;
	[ReminderFormFieldName.RepeatRule]: ReminderRepeatRule;
	[ReminderFormFieldName.LinkedGoalId]: ReminderLinkedGoalId | null;
};
