import type { TaskFormFieldName } from './constants';

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

export type DatedTask = Task & {
	__DATE_TIMESTAMP__: number;
};

export type FetchTasksOfDayParams = {
	dateTimestamp: number;
	customerId: string;
};

export type AddTaskParams = {
	task: Task;
	targetDateStartTimestamp: number;
};
export type UpdateTaskParams = {
	task: Task;
};

export type DeleteTaskParams = {
	taskId: TaskId;
};

export type TaskFormValues = {
	[TaskFormFieldName.Title]: string;
	[TaskFormFieldName.Description]: string | null;
	[TaskFormFieldName.ExpirationDateRange]: [Date, Date | null];
	[TaskFormFieldName.ReminderTime]: number | null;
	[TaskFormFieldName.Subtasks]: Subtask[];
	[TaskFormFieldName.LinkedGoalId]: TaskLinkedGoalId | null;
};
