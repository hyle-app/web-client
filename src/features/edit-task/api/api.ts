import { httpService } from '&shared/services/http';
import { EditTaskParams, TaskDTO } from './types';

async function editTask(params: EditTaskParams): Promise<void> {
	await httpService.lib.patch<Partial<TaskDTO>, void>(`/v2/tasks/${params.task.taskId}`, params.task);
}

export const editTaskApi = {
	editTask
};
