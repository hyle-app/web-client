export type CreateSubtaskDTO = {
	title: string;
	completed: boolean;
};

export type CreateTaskDTO = {
	title: string;
	customerId: string;
	taskCompletionDateRange: [number, null | number];
	description: string | undefined;
	subtasks: CreateSubtaskDTO[];
	linkedGoal: {
		id: string;
	} | null;
	remindAt: number | undefined;
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

export type CreateTaskResponse = {
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

export type CreateTaskParams = {
	task: CreateTaskDTO;
	customerId: string;
};
