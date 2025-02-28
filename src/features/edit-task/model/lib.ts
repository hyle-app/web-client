import { Task, TaskFormValues } from '&entities/task';
import { TaskFormFieldName } from '&entities/task/model/constants';
import { z } from 'zod';

export function getDefaultFormValues(task: Task): TaskFormValues {
	return {
		[TaskFormFieldName.Title]: task.title,
		[TaskFormFieldName.Description]: task.description,
		[TaskFormFieldName.ExpirationDateRange]: [
			new Date(task.targetCompletionDateRange.at(0)!),
			task.targetCompletionDateRange.at(1) ? new Date(task.targetCompletionDateRange.at(1)!) : null
		],
		[TaskFormFieldName.ReminderTime]: task.remindAt,
		[TaskFormFieldName.Subtasks]: task.subtasks,
		[TaskFormFieldName.LinkedGoalId]: task.linkedGoalId
	};
}

export function getFormValidator(originalTask: Task, minDate: Date) {
	return z.object({
		[TaskFormFieldName.Title]: z.string().min(1, 'Укажи название задачи'),
		[TaskFormFieldName.Description]: z.string().nullable(),
		[TaskFormFieldName.ExpirationDateRange]: z.tuple([z.date(), z.date().nullable()]).refine((value) => {
			const [firstDate, secondDate] = value;
			// If user didn't change dates, let it pass even in past
			if (
				originalTask.targetCompletionDateRange.at(0) === firstDate.getTime() &&
				originalTask.targetCompletionDateRange.at(1) === secondDate?.getTime()
			) {
				return true;
			}

			if (firstDate < minDate) {
				return 'Введи дату не ранее сегодняшнего дня';
			}

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
				id: z.string().transform((value) => {
					const parsed = parseInt(value, 10);
					if (isNaN(parsed)) {
						return z.NEVER;
					}

					return parsed;
				}),
				title: z.string().min(1, 'Укажи название подзадачи'),
				isCompleted: z.boolean()
			})
		),
		[TaskFormFieldName.LinkedGoalId]: z.string().nullable()
	});
}
