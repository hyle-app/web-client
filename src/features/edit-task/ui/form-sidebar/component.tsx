import { goalEntity } from '&entities/goal';
import { taskEntity, TaskForm, type TaskFormValues } from '&entities/task';
import { timeService } from '&shared/services/time';
import { Button } from '&shared/ui/button';
import { ConfirmPopover } from '&shared/ui/confirm-popover';
import { Sidebar } from '&shared/ui/sidebar';
import { Typography } from '&shared/ui/typography';
import { useEventEffect } from '&shared/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import dayjs from 'dayjs';
import { useUnit } from 'effector-react';
import { Trash } from 'lucide-react';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { getDefaultFormValues, getFormValidator, inputs, outputs } from '../../model';
import { Props } from './types';

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
		reset,
		formState: { isDirty },
		handleSubmit,
		getValues
	} = form;

	const _handleSubmit = React.useCallback(
		(formValues: TaskFormValues) => {
			applyEditTaskEvent({ taskId, formValues });
		},
		[applyEditTaskEvent]
	);

	useEventEffect(outputs.taskEdited, () => {
		reset({ ...getValues() }, { keepDirty: false, keepErrors: false, keepIsSubmitted: false, keepIsValid: true });
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
			confirmOverlayClose={isDirty}
			isOpen={isOpen}
			onClose={handleClose}
			actionMenuContentRef={sidebarActionMenuRef}
			onCloseActionMenu={handleActionMenuClose}
			foreheadSlot={
				<Typography className="text-color-gray-50" variant="caption-1">
					Задача / Создана {dayjs(task.createdAt!).format('DD MMM YYYY')}
				</Typography>
			}
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
						iconSlot={<Trash className="text-color-text-and-icon-80" />}
						labelSlot={<Typography>Удалить</Typography>}
						onClick={() => setIsConfirmDeletePopoverOpen(true)}
					/>
				</ConfirmPopover>
			]}
		>
			<FormProvider {...form}>
				<div className="relative flex h-full flex-col justify-between">
					<TaskForm goalsToLinkTo={goals} />

					<div className="sticky bottom-8 flex w-full flex-col gap-8 bg-color-bg-95 pb-8 pt-4">
						{isDirty && (
							<Button
								key="save"
								variant="button"
								appearance="primary"
								onClick={handleSubmit(_handleSubmit)}
								className="sticky bottom-8 mx-8 self-stretch"
								disabled={isEditingTask}
							>
								Сохранить изменения
							</Button>
						)}
						{!isDirty && (
							<Button
								key="complete"
								variant="button"
								appearance="primary"
								onClick={handleSubmit(_handleSubmit)}
								className="sticky bottom-8 mx-8 self-stretch"
								disabled={isEditingTask}
							>
								Отметить выполнено
							</Button>
						)}
					</div>
				</div>
			</FormProvider>
		</Sidebar>
	);
});
