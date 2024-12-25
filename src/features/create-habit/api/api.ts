import { HttpResponse, httpService } from '&shared/services/http';
import { CreateHabitParams, CreateHabitResponse, HabitDTO } from './types';

async function createHabit(params: CreateHabitParams): Promise<CreateHabitResponse> {
	const res = await httpService.lib.post<HabitDTO, HttpResponse<CreateHabitResponse>>('/habits', params.habit);

	return res.data;
}

export const createHabitApi = {
	createHabit
};
