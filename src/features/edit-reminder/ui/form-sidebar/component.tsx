import { goalEntity } from '&entities/goal';
import { ReminderForm, reminderEntity } from '&entities/reminder';
import { Button } from '&shared/ui/button';
import { Sidebar } from '&shared/ui/sidebar';
import { useUnit } from 'effector-react';
import { FormProvider, useForm } from 'react-hook-form';
import { Props } from './types';

import { ReminderFormValues } from '&entities/reminder/model';
import { timeService } from '&shared/services/time';
import { ConfirmPopover } from '&shared/ui/confirm-popover';
import { Typography } from '&shared/ui/typography';

import { useEventEffect } from '&shared/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import dayjs from 'dayjs';
import { Trash } from 'lucide-react';
import React from 'react';
import { getDefaultFormValues, getFormValidatorScheme, inputs, outputs } from '../../model';


export const EditReminderFormSidebar = React.memo(({ isOpen, onClose, reminderId }: Props) => {
	const [isConfirmDeletePopoverOpen, setIsConfirmDeletePopoverOpen] = React.useState(false);
	const sidebarActionMenuRef = React.useRef<HTMLDivElement>(null);

	const { goals, editReminderEvent, isEditingReminder, isViewingToday, completeReminderEvent, deleteReminderEvent } =
		useUnit({
			goals: goalEntity.outputs.$goals,
			editReminderEvent: inputs.editReminder,
			isEditingReminder: outputs.$isReminderEditing,
			isViewingToday: timeService.outputs.$isViewingToday,
			completeReminderEvent: inputs.completeReminder,
			deleteReminderEvent: reminderEntity.inputs.deleteReminder
		});

	const handleSubmit = (formValues: ReminderFormValues) => {
		editReminderEvent({ reminderId, formValues });
	};

	const reminder = useUnit(reminderEntity.outputs.getReminderById(reminderId));

	const form = useForm({
		defaultValues: getDefaultFormValues(reminder!),
		resolver: zodResolver(getFormValidatorScheme(reminder!, timeService.lib.getCurrentTimestamp()))
	});

	const {
		formState: { isDirty },
		getValues
	} = form;

	const showSaveChangesButton = isDirty;
	const currentDayTimestamp = React.useMemo(() => timeService.lib.getCurrentTimestamp(), [isViewingToday]);
	const showCompleteButton =
		!showSaveChangesButton &&
		isViewingToday &&
		!reminderEntity.lib.isReminderCompletedOnDay(reminder!, currentDayTimestamp);

	const handleClose = () => {
		onClose();
		setIsConfirmDeletePopoverOpen(false);
	};

	useEventEffect(outputs.reminderEdited, () => {
		form.reset({ ...getValues() }, { keepDirty: false, keepErrors: false, keepIsSubmitted: false, keepIsValid: true });
	});

	const handleActionMenuClose = () => {
		setIsConfirmDeletePopoverOpen(false);
	};

	const handleCancelConfirmation = () => {
		setIsConfirmDeletePopoverOpen(false);
	};

	const handleConfrimDeletion = () => {
		deleteReminderEvent({ reminderId });
		setIsConfirmDeletePopoverOpen(false);
		onClose();
	};

	return (
		<Sidebar
			confirmOverlayClose={form.formState.isDirty}
			isOpen={isOpen}
			onClose={handleClose}
			actionMenuContentRef={sidebarActionMenuRef}
			foreheadSlot={
				<Typography className="text-color-gray-50" variant="caption-1">
					Напоминание / Создано {dayjs(reminder!.createdAt).format('DD MMM YYYY')}
				</Typography>
			}
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
						iconSlot={<Trash className="text-color-text-and-icon-80" />}
						labelSlot={<Typography>Удалить</Typography>}
						onClick={() => setIsConfirmDeletePopoverOpen(true)}
					/>
				</ConfirmPopover>
			]}
		>
			<div className="relative flex h-full flex-col justify-between">
				<FormProvider {...form}>
					<ReminderForm goalsToLinkTo={goals} />
				</FormProvider>
				<div className="sticky bottom-8 w-full px-8 pb-8">
					{showSaveChangesButton && (
						<Button
							variant="button"
							appearance="primary"
							onClick={form.handleSubmit(handleSubmit)}
							disabled={isEditingReminder}
							className="w-full"
						>
							Сохранить изменения
						</Button>
					)}
					{showCompleteButton && (
						<Button
							variant="button"
							appearance="primary"
							onClick={() => completeReminderEvent({ reminderId })}
							className="w-full"
						>
							Отметить выполнено
						</Button>
					)}
				</div>
			</div>
		</Sidebar>
	);
});
