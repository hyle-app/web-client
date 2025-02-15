import { cheerUpFeature } from '&features/cheer-up';
import { completeGoalFeature } from '&features/complete-goal';
import { sample } from 'effector';

sample({
	clock: completeGoalFeature.outputs.goalCompletionChanged,
	fn: ({ label, progress }) => {
		return {
			progress,
			label: label ?? ''
		};
	},
	target: cheerUpFeature.inputs.showCheerupSidebar
});
