import { httpService } from '&shared/services/http';
import type { CompleteHabitParams, HabitDTO } from './types';

async function completeHabit(params: CompleteHabitParams): Promise<void> {
	await httpService.lib.post<HabitDTO>('/v1/habits/complete', params.habit);
}
export const completeHabitApi = {
	completeHabit
};
