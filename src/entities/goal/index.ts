import { lib, inputs, outputs } from './model';

export const goalEntity = {
	inputs,
	outputs,
	lib
};

export { GoalCard, GoalForm } from './ui';
export { GoalFormFieldName } from './model';
export type { GoalFormValues, Goal } from './model';
