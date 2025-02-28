import { useUnit } from 'effector-react';
import { Props } from './types';
import { goalEntity } from '&entities/goal';
import { Sidebar } from '&shared/ui/sidebar';
import { Button } from '&shared/ui/button';
import { ReminderForm, reminderEntity } from '&entities/reminder';
import { FormProvider, useForm } from 'react-hook-form';

import { getDefaultFormValues, getFormValidatorScheme, inputs, outputs } from '../../model';
import { ReminderFormValues } from '&entities/reminder/model';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useEventEffect } from '&shared/utils';
import { timeService } from '&shared/services/time';
import { ConfirmPopover } from '&shared/ui/confirm-popover';
import { Icon } from '&shared/ui/icon';
import { Typography } from '&shared/ui/typography';

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
		formState: { isDirty }
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
		form.reset(getDefaultFormValues(reminder!));
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
			<div className="relative flex h-full flex-col justify-between pb-8">
				<FormProvider {...form}>
					<ReminderForm goalsToLinkTo={goals} />
				</FormProvider>
				{showSaveChangesButton && (
					<Button
						variant="button"
						appearance="primary"
						onClick={form.handleSubmit(handleSubmit)}
						className="sticky bottom-8 mx-8 self-stretch"
						disabled={isEditingReminder}
					>
						Сохранить изменения
					</Button>
				)}
				{showCompleteButton && (
					<Button
						variant="button"
						appearance="primary"
						onClick={() => completeReminderEvent({ reminderId })}
						className="sticky bottom-8 mx-8 self-stretch"
					>
						Отметить выполнено
					</Button>
				)}
			</div>
		</Sidebar>
	);
});
