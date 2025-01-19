import { sample } from 'effector';
import { inputs, internals, outputs } from './model';
import { mapDtoToGoal, mapLinkedEntitiesDtoToLinkedEntities } from './mappers';
import { authService } from '&shared/services/auth';
import { reset } from 'patronum';
import { GoalId, LinkedEntities } from './types';

sample({
	clock: inputs.fetchGoalsAndAchievements,
	source: { user: authService.outputs.$user },
	filter: authService.outputs.$isLoggedIn,
	fn: ({ user }) => ({ customerId: user!.uid }),
	target: internals.fetchGoalsAndAchievementsFx
});

sample({
	clock: internals.fetchGoalsAndAchievementsFx.doneData,
	fn: (goalsAndAchievements) => goalsAndAchievements.map((goal) => mapDtoToGoal(goal)),
	target: outputs.$goalsAndAchievements
});

sample({
	clock: inputs.addGoal,
	source: { goalsAndAchievements: outputs.$goalsAndAchievements },
	fn: ({ goalsAndAchievements }, goal) => [...goalsAndAchievements, goal],
	target: outputs.$goalsAndAchievements
});

sample({
	clock: inputs.deleteGoal,
	source: { goalsAndAchievements: outputs.$goalsAndAchievements },
	fn: ({ goalsAndAchievements }, { goalId }) => goalsAndAchievements.filter((goal) => goal.id !== goalId),
	target: outputs.$goalsAndAchievements
});

sample({
	clock: inputs.updateGoal,
	source: { goalsAndAchievements: outputs.$goalsAndAchievements },
	fn: ({ goalsAndAchievements }, { goalId, goal: goalUpdate }) =>
		goalsAndAchievements.map((goal) => (goal.id === goalId ? goalUpdate : goal)),
	target: outputs.$goalsAndAchievements
});

sample({
	clock: inputs.deleteGoal,
	source: { user: authService.outputs.$user },
	filter: authService.outputs.$isLoggedIn,
	fn: ({ user }, { goalId }) => ({ goalId, customerId: user!.uid }),
	target: internals.deleteGoalFx
});

reset({
	clock: inputs.resetGoalsList,
	target: outputs.$goalsAndAchievements
});

sample({
	clock: internals.$goalsAndAchiementsIds.updates,
	source: { user: authService.outputs.$user },
	filter: authService.outputs.$isLoggedIn,
	fn: ({ user }, goalIds) => ({ goalIds, customerId: user!.uid }),
	target: internals.fetchGoalsLinkedEntitiesFx
});

sample({
	clock: internals.fetchGoalsLinkedEntitiesFx.doneData,
	fn: (linkedEntities) =>
		linkedEntities.reduce(
			(acc, linkedEntity) => {
				acc[String(linkedEntity.goal.goalId)] = mapLinkedEntitiesDtoToLinkedEntities(linkedEntity);
				return acc;
			},
			{} as Record<GoalId, LinkedEntities>
		),
	target: outputs.$linkedEntities
});
