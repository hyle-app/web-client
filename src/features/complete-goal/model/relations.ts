import { sample } from 'effector';
import { inputs, internals, outputs } from './model';
import { goalEntity } from '&entities/goal';
import { spread } from 'patronum';
import { mapGoalToDTO } from './mappers';

sample({
	clock: inputs.fillComplexGoalProgress,
	source: { goalsAndAchievements: goalEntity.outputs.$goalsAndAchievements },
	filter: ({ goalsAndAchievements }, { goalId }) => {
		return goalsAndAchievements.some(({ id }) => id === goalId);
	},
	fn: ({ goalsAndAchievements }, { goalId, progressDelta }) => {
		const goal = goalsAndAchievements.find(({ id }) => id === goalId)!;
		const newGoalState = goalEntity.lib.fillComplexGoalProgress(goal, progressDelta);

		return {
			local: {
				goalId,
				goal: newGoalState
			},
			remote: {
				goalId,
				goal: mapGoalToDTO(newGoalState)
			},
			goalCompletionChanged: {
				goalId,
				label: newGoalState.progress?.label ?? undefined,
				progress: {
					old: goal.progress?.currentProgress ?? 0,
					new: newGoalState.progress?.currentProgress ?? 0,
					target: newGoalState.progress?.targetProgress ?? 1
				}
			}
		};
	},
	target: spread({
		local: goalEntity.inputs.updateGoal,
		remote: internals.updateGoalCompletionFx,
		goalCompletionChanged: outputs.goalCompletionChanged
	})
});

sample({
	clock: inputs.completeSimpleGoal,
	source: { goalsAndAchievements: goalEntity.outputs.$goalsAndAchievements },
	filter: ({ goalsAndAchievements }, { goalId }) => {
		return goalsAndAchievements.some(({ id }) => id === goalId);
	},
	fn: ({ goalsAndAchievements }, { goalId }) => {
		const goal = goalsAndAchievements.find(({ id }) => id === goalId)!;
		const newGoalState = goalEntity.lib.completeSimpleGoal(goal);

		return {
			local: {
				goalId,
				goal: newGoalState
			},
			remote: {
				goalId,
				goal: mapGoalToDTO(newGoalState)
			},
			goalCompletionChanged: {
				goalId,
				label: newGoalState.progress?.label ?? undefined,
				progress: {
					old: 0,
					new: 1,
					target: 1
				}
			}
		};
	},
	target: spread({
		local: goalEntity.inputs.updateGoal,
		remote: internals.updateGoalCompletionFx,
		goalCompletionChanged: outputs.goalCompletionChanged
	})
});
