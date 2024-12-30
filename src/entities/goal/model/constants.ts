export enum GoalCategory {
	Career = 'CAREER',
	Health = 'HEALTH',
	Finance = 'FINANCE',
	Hobby = 'HOBBY',
	Family = 'FAMILY',
	Friends = 'FRIENDS'
}

export const DEFAULT_GOAL_WEIGHT = 1;

export const ALLOWED_GOAL_WEIGHTS = [1, 2, 3, 4, 5];

export enum GoalFormFieldName {
	Title = 'title',
	Category = 'category',
	Description = 'description',
	Emoji = 'emoji',
	Weight = 'weight',
	TargetDate = 'targetDate',
	ProgressDetailsCount = 'progressDetailsCount',
	ProgressDetailsLabel = 'progressDetailsLabel',
	LinkedEntities = 'linkedEntities'
}
