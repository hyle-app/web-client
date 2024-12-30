import { sample } from 'effector';
import { inputs, internals, outputs } from './model';
import { mapDtoToGoal, mapFormValuesToDTO } from './mappers';
import { authService } from '&shared/services/auth';
import { goalEntity } from '&entities/goal';

sample({
	clock: inputs.createNewGoal,
	filter: authService.outputs.$isLoggedIn,
	fn: (values) => ({ goal: mapFormValuesToDTO(values) }),
	target: internals.createGoalFx
});

sample({
	clock: internals.createGoalFx.doneData,
	fn: (goal) => mapDtoToGoal(goal),
	target: [outputs.goalCreated, goalEntity.inputs.addGoal]
});
