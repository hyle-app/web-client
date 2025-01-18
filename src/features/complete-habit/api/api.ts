import { httpService } from '&shared/services/http';
import type { CompleteHabitParams, HabitDTO } from './types';

async function completeHabit({ habit, customerId }: CompleteHabitParams): Promise<void> {
	await httpService.lib.patch<HabitDTO>(`/v1/habits/${habit.habitId}?customerId=${customerId}`, habit);
}
export const completeHabitApi = {
	completeHabit
};
