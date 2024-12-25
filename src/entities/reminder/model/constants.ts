export enum ReminderRepeatRule {
	Never = 'NEVER',
	EveryWeek = 'EVERY_WEEK',
	EveryMonth = 'EVERY_MONTH',
	EveryYear = 'EVERY_YEAR'
}

export enum ReminderFormFieldName {
	Title = 'title',
	ExpiresAt = 'expiresAt',
	Description = 'description',
	LinkedGoalId = 'linkedGoalId',
	RepeatRule = 'repeatRule',
	TargetDate = 'targetDate',
	TargetTime = 'targetTime'
}
