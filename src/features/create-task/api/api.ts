import { HttpResponse, httpService } from '&shared/services/http';
import { CreateTaskDTO, CreateTaskParams, CreateTaskResponse } from './types';

async function createTask(params: CreateTaskParams) {
	const res = await httpService.lib.post<CreateTaskDTO, HttpResponse<CreateTaskResponse>>('/v2/tasks', params.task);
	return res.data;
}

export const createTaskApi = {
	createTask
};
