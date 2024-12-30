import { httpService } from '&shared/services/http';
import { DeleteHabitParams, FetchHabitsOfDayParams, HabitDTO } from './types';

async function fetchHabitsOfDay(params: FetchHabitsOfDayParams): Promise<HabitDTO[]> {
	const res = await httpService.lib.get<HabitDTO[]>(
		`/v1/habits?customerId=${params.customerId}&dateTimestamp=${params.dateTimestamp}`
	);

	return res.data;
}

async function deleteHabit({ customerId, habitId }: DeleteHabitParams): Promise<void> {
	await httpService.lib.delete<void>(`/v1/habits/${habitId}?customerId=${customerId}`);
}

export const habitApi = {
	fetchHabitsOfDay,
	deleteHabit
};
