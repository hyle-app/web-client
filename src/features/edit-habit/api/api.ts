import { httpService } from '&shared/services/http';
import { EditHabitParams, HabitDTO } from './types';

async function editHabit(params: EditHabitParams): Promise<void> {
	await httpService.lib.patch<HabitDTO>('/v1/habits', params.habit);
}

export const editHabitApi = {
	editHabit
};
