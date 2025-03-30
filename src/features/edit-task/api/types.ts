export type TaskLinkedGoal = {
	id: string;
	title: string;
};

export type Subtask = {
	id: string;
	title: string;
	completed: boolean;
};

export type TaskDTO = {
	taskId: string;
	title: string;
	createdAt: number;
	completedAt: number | null;
	taskCompletionDateRange?: [number, number | null];
	description?: string;
	subtasks: Subtask[];
	linkedGoal: TaskLinkedGoal | null;
	remindAt?: number;
};

export type EditTaskParams = {
	customerId: string;
	task: TaskDTO;
};
