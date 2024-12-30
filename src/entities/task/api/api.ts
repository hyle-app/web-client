import { httpService } from '&shared/services/http';
import type { DeleteTaskParams, FetchTasksOfDayParams, TaskDTO } from './types';

async function fetchTasksOfDay(params: FetchTasksOfDayParams) {
	const res = await httpService.lib.get<TaskDTO[]>(
		`/v2/tasks?customerId=${params.customerId}&dateTimestamp=${params.dateTimestamp}`
	);

	return res.data;
}

async function deleteTask({ customerId, taskId }: DeleteTaskParams) {
	await httpService.lib.delete(`/v2/tasks/${taskId}?customerId=${customerId}`);
}

export const taskApi = {
	fetchTasksOfDay,
	deleteTask
};
