import { sample } from 'effector';
import { inputs, internals, outputs } from './model';
import { goalEntity } from '&entities/goal';
import { mapGoalToDto } from './mappers';
import { spread } from 'patronum';

sample({
	clock: inputs.editGoal,
	source: { goalsAndAchievements: goalEntity.outputs.$goalsAndAchievements },
	filter: ({ goalsAndAchievements }, { goalId }) => goalsAndAchievements.some((goal) => goal.id === goalId),
	fn: ({ goalsAndAchievements }, { goalId, formValues }) => {
		const goal = goalsAndAchievements.find((goal) => goal.id === goalId)!;

		const newGoalState = goalEntity.lib.updateGoalWithFormValues(goal, formValues);

		return {
			local: { goalId, goal: newGoalState },
			remote: { goalId, goal: mapGoalToDto(newGoalState) }
		};
	},
	target: spread({
		local: goalEntity.inputs.updateGoal,
		remote: internals.editGoalFx
	})
});

sample({
	clock: internals.editGoalFx.doneData,
	target: outputs.goalEdited
});
