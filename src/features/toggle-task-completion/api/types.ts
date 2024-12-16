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
	completedAt: number | null;
	subtasks: Subtask[];
};

export type ChangeTaskCompletionParams = {
	customerId: string;
	task: TaskDTO;
};
