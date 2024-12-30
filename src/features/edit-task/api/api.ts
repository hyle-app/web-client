import { httpService } from '&shared/services/http';
import { EditTaskParams, TaskDTO } from './types';

async function editTask({ task, customerId }: EditTaskParams): Promise<void> {
	await httpService.lib.patch<Partial<TaskDTO>, void>(`/v2/tasks/${task.taskId}?customerId=${customerId}`, task);
}

export const editTaskApi = {
	editTask
};
