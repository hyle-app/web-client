import { httpService } from '&shared/services/http';
import type { CreateGoalParams, GoalDTO } from './types';

async function createGoal({ goal }: CreateGoalParams): Promise<GoalDTO> {
	const res = await httpService.lib.post<GoalDTO>('/v1/goals', goal);

	if (res.status < 300 && Object.values(goal.entitiesToLink).reduce((acc, val) => acc + val.length, 0) > 0) {
		await httpService.lib.post(`/v1/composite-activities/${res.data.customerId}/goals/${res.data.goalId}`, {
			linkedTasks: [],
			linkedPeriodTasks: goal.entitiesToLink.tasks,
			linkedReminders: goal.entitiesToLink.reminders,
			linkedHabits: goal.entitiesToLink.habits
		});
	}

	return res.data;
}

export const createGoalApi = {
	createGoal
};
