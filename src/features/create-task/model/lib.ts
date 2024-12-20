import { TaskFormValues } from '&entities/task';
import { TaskFormFieldName } from '&entities/task/model/constants';
import { z } from 'zod';

export function getDefaultFormValues(currentAppDateTimestamp: number): TaskFormValues {
	return {
		[TaskFormFieldName.Title]: '',
		[TaskFormFieldName.Description]: null,
		[TaskFormFieldName.ExpirationDateRange]: [new Date(currentAppDateTimestamp), null],
		[TaskFormFieldName.ReminderTime]: null,
		[TaskFormFieldName.Subtasks]: [],
		[TaskFormFieldName.LinkedGoalId]: null
	};
}

export function getFormValidator(minDate: Date) {
	return z.object({
		[TaskFormFieldName.Title]: z.string().min(1, 'Укажи название задачи'),
		[TaskFormFieldName.Description]: z.string().nullable(),
		[TaskFormFieldName.ExpirationDateRange]: z
			.tuple([z.date().min(minDate, 'Введи дату не ранее сегодняшнего дня'), z.date().nullable()])
			.refine((value) => {
				const [firstDate, secondDate] = value;

				if (secondDate === null) {
					return true;
				}

				if (firstDate.getTime() > secondDate.getTime()) {
					return 'Дата окончания не может быть раньше даты начала';
				}

				return true;
			}),
		[TaskFormFieldName.ReminderTime]: z.coerce.number().nullable(),
		[TaskFormFieldName.Subtasks]: z.array(
			z.object({
				id: z.string(),
				title: z.string().min(1, 'Укажи название подзадачи'),
				isCompleted: z.boolean()
			})
		),
		[TaskFormFieldName.LinkedGoalId]: z.string().nullable()
	});
}
