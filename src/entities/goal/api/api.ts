import { httpService } from '&shared/services/http';
import {
	DeleteGoalParams,
	FetchGoalsLinkedEntitiesDTO,
	FetchGoalsLinkedEntitiesParams,
	FetchGoalsParams,
	GoalDTO
} from './types';

async function fetchGoals({ customerId }: FetchGoalsParams): Promise<GoalDTO[]> {
	const res = await httpService.lib.get(`/v1/goals?customerId=${customerId}`);
	return res.data;
}

async function deleteGoal({ goalId, customerId }: DeleteGoalParams): Promise<void> {
	await httpService.lib.delete(`/v1/goals/${goalId}?customerId=${customerId}`);
}

async function fetchGoalsLinkedEntities({
	goalIds
}: FetchGoalsLinkedEntitiesParams): Promise<FetchGoalsLinkedEntitiesDTO[]> {
	const ress = await Promise.allSettled(
		goalIds.map((goalId) => httpService.lib.get<FetchGoalsLinkedEntitiesDTO>(`/v1/goals/${goalId}`))
	);

	return ress.reduce((acc, res) => {
		if (res.status !== 'fulfilled') return acc;

		const { data } = res.value;
		acc.push(data);

		return acc;
	}, [] as FetchGoalsLinkedEntitiesDTO[]);
}

export const goalApi = { fetchGoals, deleteGoal, fetchGoalsLinkedEntities };
