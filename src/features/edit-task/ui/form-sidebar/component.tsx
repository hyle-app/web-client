import { FormProvider, useForm } from 'react-hook-form';
import { useUnit } from 'effector-react';
import { Props } from './types';
import { goalEntity } from '&entities/goal';
import { Sidebar } from '&shared/ui/sidebar';
import { taskEntity, TaskForm, type TaskFormValues } from '&entities/task';
import { Button } from '&shared/ui/button';
import { getDefaultFormValues, getFormValidator, inputs, outputs } from '../../model';
import { timeService } from '&shared/services/time';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useEventEffect } from '&shared/utils';

const MIN_DATE = new Date(timeService.lib.getStartOfTheDay(timeService.lib.getCurrentTimestamp()));

export const EditTaskFormSidebar = React.memo(({ isOpen, onClose, taskId }: Props) => {
	const { goals, applyEditTaskEvent, isEditingTask } = useUnit({
		goals: goalEntity.outputs.$goals,
		applyEditTaskEvent: inputs.applyEditTask,
		isEditingTask: outputs.$isEditingTask
	});

	const task = useUnit(taskEntity.outputs.getTaskById(taskId));

	const form = useForm<TaskFormValues>({
		defaultValues: getDefaultFormValues(task!),
		resolver: zodResolver(getFormValidator(task!, MIN_DATE))
	});
	const {
		formState: { isDirty }
	} = form;

	const handleSubmit = (formValues: TaskFormValues) => {
		applyEditTaskEvent({ taskId, formValues });
	};

	useEventEffect(outputs.taskEdited, () => {
		form.reset();
	});

	if (!task) return;

	return (
		<Sidebar isOpen={isOpen} onClose={onClose}>
			<FormProvider {...form}>
				<div className="flex flex-col justify-between pb-8 h-full">
					<TaskForm goalsToLinkTo={goals} />
					{isDirty && (
						<Button
							variant="button"
							appearance="primary"
							onClick={form.handleSubmit(handleSubmit)}
							className="mx-8 self-stretch"
							disabled={isEditingTask}
						>
							Сохранить изменения
						</Button>
					)}
				</div>
			</FormProvider>
		</Sidebar>
	);
});
