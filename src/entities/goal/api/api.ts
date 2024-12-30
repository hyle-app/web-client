import { httpService } from '&shared/services/http';
import { DeleteGoalParams, FetchGoalsParams, GoalDTO } from './types';

async function fetchGoals({ customerId }: FetchGoalsParams): Promise<GoalDTO[]> {
	const res = await httpService.lib.get(`/v1/goals?customerId=${customerId}`);
	return res.data;
}

async function deleteGoal({ goalId, customerId }: DeleteGoalParams): Promise<void> {
	await httpService.lib.delete(`/v1/goals/${goalId}?customerId=${customerId}`);
}

export const goalApi = { fetchGoals, deleteGoal };
