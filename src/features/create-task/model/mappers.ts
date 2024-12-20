import { Task, TaskFormValues } from '&entities/task';
import { TaskFormFieldName } from '&entities/task/model/constants';
import { CreateTaskDTO, CreateTaskResponse } from '../api/types';

export function mapFormValueToDto(formValues: TaskFormValues): CreateTaskDTO {
	return {
		title: formValues[TaskFormFieldName.Title],
		taskCompletionDateRange: [
			formValues[TaskFormFieldName.ExpirationDateRange].at(0)!.getTime(),
			formValues[TaskFormFieldName.ExpirationDateRange].at(1)?.getTime() ?? null
		],
		description: formValues[TaskFormFieldName.Description] ?? undefined,
		subtasks: formValues[TaskFormFieldName.Subtasks].map((subtask) => ({
			id: subtask.id,
			title: subtask.title,
			completed: subtask.isCompleted
		})),
		linkedGoal: formValues[TaskFormFieldName.LinkedGoalId]
			? {
					id: formValues[TaskFormFieldName.LinkedGoalId]
				}
			: null,
		remindAt: formValues[TaskFormFieldName.ReminderTime] ?? undefined
	};
}

export function mapDtoToTask(dto: CreateTaskResponse): Task {
	return {
		id: dto.taskId,
		title: dto.title,
		createdAt: dto.createdAt,
		completedAt: dto.completedAt,
		targetCompletionDateRange: dto.taskCompletionDateRange ?? [0, null],
		description: dto.description ?? null,
		subtasks: dto.subtasks.map((subtask) => ({
			id: String(subtask.id),
			title: subtask.title,
			isCompleted: subtask.completed
		})),
		remindAt: dto.remindAt ?? null,
		linkedGoalId: String(dto.linkedGoal?.id) ?? null
	};
}
