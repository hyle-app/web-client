import { httpService } from '&shared/services/http';
import { UpdateGoalCompletionParams } from './types';

async function updateGoalCompletion({ goalId, goal }: UpdateGoalCompletionParams): Promise<void> {
	await httpService.lib.patch(`/v1/goals/${goalId}`, goal);
}

export const completeGoalApi = {
	updateGoalCompletion
};
