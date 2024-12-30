import { useUnit } from 'effector-react';
import type { Props } from './types';
import { getDefaultFormValues, getFormValidator, inputs, outputs } from '../../model';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { goalEntity, GoalForm, GoalFormValues } from '&entities/goal';
import { zodResolver } from '@hookform/resolvers/zod';
import { timeService } from '&shared/services/time';
import { Sidebar } from '&shared/ui/sidebar';
import { Button } from '&shared/ui/button';
import { useEventEffect } from '&shared/utils';
import { ConfirmPopover } from '&shared/ui/confirm-popover';
import { Icon } from '&shared/ui/icon';
import { Typography } from '&shared/ui/typography';

const MIN_DATE = new Date(timeService.lib.getStartOfTheDay(timeService.lib.getCurrentTimestamp()));

export const EditGoalFormSidebar = React.memo(({ isOpen, onClose, goalId }: Props) => {
	const { editGoalEvent, isEditingGoal, goal, deleteGoalEvent } = useUnit({
		editGoalEvent: inputs.editGoal,
		isEditingGoal: outputs.isGoalEditing,
		goal: goalEntity.outputs.getGoalOrAchievementById(goalId),
		deleteGoalEvent: goalEntity.inputs.deleteGoal
	});

	const [isConfirmDeletePopoverOpen, setIsConfirmDeletePopoverOpen] = React.useState(false);
	const sidebarActionMenuRef = React.useRef<HTMLDivElement>(null);

	const form = useForm<GoalFormValues>({
		defaultValues: getDefaultFormValues(goal!),
		resolver: zodResolver(getFormValidator(goal!, MIN_DATE))
	});

	const handleSubmit = (formValues: GoalFormValues) => {
		editGoalEvent({ formValues, goalId });
	};

	const {
		formState: { isDirty }
	} = form;

	useEventEffect(outputs.goalEdited, () => {
		form.reset(getDefaultFormValues(goal!));
	});

	React.useEffect(() => {
		if (isOpen) return;

		form.reset();
	}, [isOpen]);

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
		deleteGoalEvent({ goalId });
		setIsConfirmDeletePopoverOpen(false);
		onClose();
	};

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
				<div className="flex flex-col justify-between pb-8 h-full">
					<GoalForm withCalendarShortcuts />

					{isDirty && (
						<Button
							variant="button"
							appearance="primary"
							onClick={form.handleSubmit(handleSubmit)}
							className="mx-8 self-stretch"
							disabled={isEditingGoal}
						>
							Сохранить изменения
						</Button>
					)}
				</div>
			</FormProvider>
		</Sidebar>
	);
});
