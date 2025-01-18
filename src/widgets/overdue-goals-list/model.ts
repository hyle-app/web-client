import { goalEntity } from '&entities/goal';
import { GoalId } from '&entities/goal/model/types';
import { routerService } from '&shared/services/router';
import { combine, createEvent, sample } from 'effector';

const selectedGoalIdStorage = routerService.outputs.createQueryParamStorage('selected_overdue_goal_id');

const setSelectedGoalId = createEvent<GoalId>();
const $selectedGoalId = combine(
	{ selectedGoalId: selectedGoalIdStorage.$value, knownGoals: goalEntity.outputs.$goalsAndAchievements },
	({ selectedGoalId, knownGoals }) => {
		if (!selectedGoalId) return null;

		const goal = knownGoals.find((goal) => goal.id === selectedGoalId);
		if (!goal) return null;

		return selectedGoalId;
	}
);
const resetSelectedGoalId = selectedGoalIdStorage.reset;

// NOTE: This one is to prevent user getting invalid state on page reload in case server did not return selected goal for any reason
sample({
	clock: goalEntity.outputs.initialGoalFetched,
	source: { selectedGoalId: $selectedGoalId, storageValue: selectedGoalIdStorage.$value },
	filter: ({ selectedGoalId, storageValue }) => selectedGoalId === null && storageValue !== null,
	fn: () => null as unknown as void,
	target: resetSelectedGoalId
});

sample({
	clock: setSelectedGoalId,
	fn: (goalId) => ({ value: goalId }),
	target: selectedGoalIdStorage.set
});

export const outputs = {
	$selectedGoalId: $selectedGoalId
};

export const inputs = {
	setSelectedGoalId,
	resetSelectedGoalId
};
