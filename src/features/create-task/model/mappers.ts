import { Task, TaskFormValues } from '&entities/task';
import { TaskFormFieldName } from '&entities/task/model/constants';
import { CreateTaskDTO, CreateTaskResponse } from '../api/types';

export function mapFormValueToDto(formValues: TaskFormValues): CreateTaskDTO {
	return {
		title: formValues[TaskFormFieldName.Title],
		taskCompletionDateRange: [
			formValues[TaskFormFieldName.ExpirationDateRange].at(0)!.getTime(),
			formValues[TaskFormFieldName.ExpirationDateRange].at(1)?.getTime() ??
				formValues[TaskFormFieldName.ExpirationDateRange].at(0)!.getTime()
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
	const targetCompletionDateRange: [number, null | number] = [0, null];

	if (
		dto.taskCompletionDateRange &&
		dto.taskCompletionDateRange[0] &&
		dto.taskCompletionDateRange[1] &&
		dto.taskCompletionDateRange[0] !== dto.taskCompletionDateRange[1]
	) {
		targetCompletionDateRange[0] = dto.taskCompletionDateRange[0];
		targetCompletionDateRange[1] = dto.taskCompletionDateRange[1];
	}

	if (
		(dto.taskCompletionDateRange && dto.taskCompletionDateRange[0] && !dto.taskCompletionDateRange[1]) ||
		(dto.taskCompletionDateRange &&
			dto.taskCompletionDateRange[0] &&
			dto.taskCompletionDateRange[0] === dto.taskCompletionDateRange[1])
	) {
		targetCompletionDateRange[0] = dto.taskCompletionDateRange[0];
		targetCompletionDateRange[1] = null;
	}
	return {
		id: dto.taskId.toString(),
		title: dto.title,
		createdAt: dto.createdAt,
		completedAt: dto.completedAt,
		targetCompletionDateRange: targetCompletionDateRange,
		description: dto.description ?? null,
		subtasks:
			dto.subtasks?.map((subtask) => ({
				id: String(subtask.id),
				title: subtask.title,
				isCompleted: subtask.completed
			})) ?? [],
		remindAt: dto.remindAt ?? null,
		linkedGoalId: String(dto.linkedGoal?.id) ?? null
	};
}
