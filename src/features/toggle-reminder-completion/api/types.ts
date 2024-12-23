export type CompleteReminderDTO = {
	reminderId: string;
	completedAt: number | null;
	completions: number[];
	expiresAt: number;
};

export type CompleteReminderParams = {
	reminder: CompleteReminderDTO;
	reminderId: string;
};
