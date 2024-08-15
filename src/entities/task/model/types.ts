export type TaskId = string;
export type SubtaskId = string;
export type TaskLinkedGoalId = string;

export type Subtask = {
	id: SubtaskId;
	title: string;
	isCompleted: boolean;
};

export type Task = {
	id: TaskId;
	title: string;
	createdAt: number;
	completedAt: number | null;
	targetCompletionDateRange: [number, number | null];
	description: string | null;
	subtasks: Subtask[];
	remindAt: number | null;
	linkedGoalId: TaskLinkedGoalId | null;
};
