import { TaskFormValues, TaskId } from '&entities/task';

export type EditTaskFxParams = {
	taskId: TaskId;
	formValues: TaskFormValues;
};
