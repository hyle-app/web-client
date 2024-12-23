export type ReminderLinkedGoal = {
	id: number;
	title: string;
};

export type ReminderDTO = {
	locked: boolean;
	customerId: number;
	reminderId: string;
	title: string;
	createdAt: number;
	expiresAt: number;
	completedAt?: number | null;
	deletedAt: number;
	description: string;
	linkedGoal: ReminderLinkedGoal | null;
	completions: number[];
	expirations: number[];
	rule: 'NEVER' | 'EVERY_WEEK' | 'EVERY_MONTH' | 'EVERY_YEAR';
};

export type FetchRemindersOfDayParams = {
	dateTimestamp: number;
	customerId: string;
};

export type DeleteReminderParams = {
	reminderId: string;
};
