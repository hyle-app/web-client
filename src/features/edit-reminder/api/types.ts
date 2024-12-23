export type ReminderLinkedGoal = {
	id: string;
	title: string;
};

export type EditReminderDTO = {
	reminderId: string;
	title: string;
	expiresAt: number;
	description: string;
	linkedGoal: ReminderLinkedGoal | null;
	rule: 'NEVER' | 'EVERY_WEEK' | 'EVERY_MONTH' | 'EVERY_YEAR';
};

export type CompleteReminderDTO = {
	reminderId: string;
	completedAt: number | null;
	completions: number[];
	expiresAt: number;
};

export type EditReminderParams = {
	reminder: EditReminderDTO;
	reminderId: string;
};

export type CompleteReminderParams = {
	reminder: CompleteReminderDTO;
	reminderId: string;
};
