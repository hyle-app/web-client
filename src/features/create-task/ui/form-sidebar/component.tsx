import { FormProvider, useForm } from 'react-hook-form';
import { useUnit } from 'effector-react';
import { Props } from './types';
import { goalEntity } from '&entities/goal';
import { Sidebar } from '&shared/ui/sidebar';
import { TaskForm, type TaskFormValues } from '&entities/task';
import { Button } from '&shared/ui/button';
import { getDefaultFormValues, getFormValidator, inputs, outputs } from '../../model';
import { timeService } from '&shared/services/time';
import { useEventEffect } from '&shared/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';

const MIN_DATE = new Date(timeService.lib.getStartOfTheDay(timeService.lib.getCurrentTimestamp()));

export const CreateTaskFormSidebar = React.memo(({ isOpen, onClose }: Props) => {
	const { goals, currentAppDateStart, createNewTaskEvent, isCreatingTask } = useUnit({
		goals: goalEntity.outputs.$goals,
		currentAppDateStart: timeService.outputs.$currentAppDateStart,
		createNewTaskEvent: inputs.createNewTask,
		isCreatingTask: outputs.$isCreatingTask
	});

	useEventEffect(outputs.taskCreated, onClose);

	const handleSubmit = (formValues: TaskFormValues) => {
		createNewTaskEvent(formValues);
	};

	const form = useForm<TaskFormValues>({
		defaultValues: getDefaultFormValues(currentAppDateStart),
		resolver: zodResolver(getFormValidator(MIN_DATE))
	});

	const handleClose = () => {
		onClose();
	};

	React.useEffect(() => {
		if (!isOpen) return;

		form.reset(getDefaultFormValues(currentAppDateStart));
	}, [isOpen]);

	return (
		<Sidebar isOpen={isOpen} onClose={handleClose} confirmOverlayClose>
			<FormProvider {...form}>
				<div className="flex flex-col justify-between pb-8 h-full">
					<TaskForm goalsToLinkTo={goals} withCalendarShortcuts />
					<Button
						variant="button"
						appearance="primary"
						onClick={form.handleSubmit(handleSubmit)}
						className="mx-8 self-stretch bottom-8 sticky"
						disabled={isCreatingTask}
					>
						Создать задачу
					</Button>
				</div>
			</FormProvider>
		</Sidebar>
	);
});
