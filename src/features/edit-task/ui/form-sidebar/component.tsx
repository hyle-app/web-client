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
import { Icon } from '&shared/ui/icon';
import { Typography } from '&shared/ui/typography';
import { ConfirmPopover } from '&shared/ui/confirm-popover';

const MIN_DATE = new Date(timeService.lib.getStartOfTheDay(timeService.lib.getCurrentTimestamp()));

export const EditTaskFormSidebar = React.memo(({ isOpen, onClose, taskId }: Props) => {
	const [isConfirmDeletePopoverOpen, setIsConfirmDeletePopoverOpen] = React.useState(false);
	const sidebarActionMenuRef = React.useRef<HTMLDivElement>(null);

	const { goals, applyEditTaskEvent, isEditingTask, deleteTaskEvent } = useUnit({
		goals: goalEntity.outputs.$goals,
		applyEditTaskEvent: inputs.applyEditTask,
		isEditingTask: outputs.$isEditingTask,
		deleteTaskEvent: taskEntity.inputs.deleteTask
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
		form.reset(getDefaultFormValues(task!));
	});

	const handleClose = () => {
		setIsConfirmDeletePopoverOpen(false);
		onClose();
	};

	const handleActionMenuClose = () => {
		setIsConfirmDeletePopoverOpen(false);
	};

	const handleCancelConfirmation = () => {
		setIsConfirmDeletePopoverOpen(false);
	};

	const handleConfrimDeletion = () => {
		deleteTaskEvent({ taskId: taskId });
		setIsConfirmDeletePopoverOpen(false);
		onClose();
	};

	if (!task) return;

	return (
		<Sidebar
			isOpen={isOpen}
			onClose={handleClose}
			actionMenuContentRef={sidebarActionMenuRef}
			onCloseActionMenu={handleActionMenuClose}
			actions={[
				<ConfirmPopover
					isOpen={isConfirmDeletePopoverOpen}
					onClose={handleCancelConfirmation}
					confirmButtonAppearance="error"
					portalContainerRef={sidebarActionMenuRef}
					onConfirm={handleConfrimDeletion}
					confirmationText="Подтверди удаление задачи"
				>
					<Sidebar.Action
						iconSlot={<Icon name="trash" />}
						labelSlot={<Typography className="text-color-text-and-icon-80">Удалить</Typography>}
						onClick={() => setIsConfirmDeletePopoverOpen(true)}
					/>
				</ConfirmPopover>
			]}
		>
			<FormProvider {...form}>
				<div className="flex flex-col justify-between pb-8 h-full relative">
					<TaskForm goalsToLinkTo={goals} />
					{isDirty && (
						<Button
							variant="button"
							appearance="primary"
							onClick={form.handleSubmit(handleSubmit)}
							className="mx-8 self-stretch bottom-8 sticky"
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
