import { getCategoryLabel, inputs, outputs } from './model';

export { GoalCard } from './ui';
export const goalEntity = {
	inputs,
	outputs,
	lib: {
		getCategoryLabel
	}
};
