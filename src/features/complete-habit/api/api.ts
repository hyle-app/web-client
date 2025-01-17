import { httpService } from '&shared/services/http';
import type { CompleteHabitParams, HabitDTO } from './types';

async function completeHabit(params: CompleteHabitParams): Promise<void> {
	await httpService.lib.patch<HabitDTO>('/v1/habits', params.habit);
}
export const completeHabitApi = {
	completeHabit
};
