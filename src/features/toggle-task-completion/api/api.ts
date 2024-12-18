import { TaskDTO } from '&entities/task/api';
import { httpService } from '&shared/services/http';
import { ChangeTaskCompletionParams } from './types';

async function changeTaskCompletion(params: ChangeTaskCompletionParams): Promise<void> {
	await httpService.lib.patch<Partial<TaskDTO>, void>(`/v2/tasks/${params.task.taskId}`, params.task);
}

async function changeSubtaskCompletion(params: ChangeTaskCompletionParams): Promise<void> {
	await httpService.lib.patch<Partial<TaskDTO>, void>(`/v2/tasks/${params.task.taskId}`, params.task);
}

export const toggleTaskCompletionApi = {
	changeTaskCompletion,
	changeSubtaskCompletion
};
