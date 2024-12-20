export type FetchTasksOfDayParams = {
	customerId: string;
	dateTimestamp: number;
};

export type TaskLinkedGoal = {
	id: number;
	title: string;
};

export type Subtask = {
	id: number;
	title: string;
	completed: boolean;
};

export type TaskDTO = {
	locked: boolean;
	customerId: string;
	taskId: string;
	title: string;
	createdAt: number;
	completedAt: number | null;
	taskCompletionDateRange?: [number, number | null];
	deletedAt?: number;
	description?: string;
	subtasks: Subtask[];
	linkedGoal: TaskLinkedGoal | null;
	remindAt?: number;
};

export type DeleteTaskParams = {
	taskId: string;
	customerId: string;
};
