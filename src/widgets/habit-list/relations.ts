import { cheerUpFeature } from '&features/cheer-up';
import { completeHabitFeature } from '&features/complete-habit';
import { sample } from 'effector';
import { delay } from 'patronum';

sample({
	clock: delay(completeHabitFeature.outputs.habitCompletedOnDay, 20),
	filter: (payload) => Boolean(payload),
	fn: ({ totalProgress }) => {
		return {
			progress: totalProgress
		};
	},
	target: cheerUpFeature.inputs.showCheerupSidebar
});

sample({
	clock: delay(completeHabitFeature.outputs.habitPartiallyCompletedOnDay, 20),
	filter: (payload) => Boolean(payload),
	fn: ({ dailyProgress }) => {
		return {
			progress: dailyProgress
		};
	},
	target: cheerUpFeature.inputs.showCheerupSidebar
});
