import { httpService } from '&shared/services/http';
import { FetchHabitsOfDayParams, HabitDTO } from './types';

async function fetchHabitsOfDay(params: FetchHabitsOfDayParams): Promise<HabitDTO[]> {
	const res = await httpService.lib.get<HabitDTO[]>(
		`/v1/habits?customerId=${params.customerId}&dateTimestamp=${params.dateTimestamp}`
	);

	return res.data;
}

export const habitApi = {
	fetchHabitsOfDay
};
