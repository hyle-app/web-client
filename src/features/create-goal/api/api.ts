import { httpService } from '&shared/services/http';
import type { CreateGoalParams, GoalDTO } from './types';

async function createGoal({ goal }: CreateGoalParams): Promise<GoalDTO> {
	const res = await httpService.lib.post('/v1/goals', goal);

	return res.data;
}

export const createGoalApi = {
	createGoal
};
