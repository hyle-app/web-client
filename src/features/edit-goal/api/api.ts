import { httpService } from '&shared/services/http';
import type { EditGoalParams } from './types';

async function editGoal({ goal, goalId }: EditGoalParams): Promise<void> {
	const res = await httpService.lib.patch(`/v1/goals/${goalId}`, goal);

	return res.data;
}

export const editGoalApi = {
	editGoal
};
