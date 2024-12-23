import { FormProvider, useForm } from 'react-hook-form';
import { useUnit } from 'effector-react';
import { Props } from './types';
import { goalEntity } from '&entities/goal';
import { Sidebar } from '&shared/ui/sidebar';
import { Button } from '&shared/ui/button';
import { getDefaultFormValues, getFormValidator, inputs, outputs } from '../../model';
import { zodResolver } from '@hookform/resolvers/zod';
import { habitEntity, HabitForm, HabitFormValues } from '&entities/habit';
import { cn, useEventEffect } from '&shared/utils';
import { timeService } from '&shared/services/time';
import React from 'react';
import { Input } from '&shared/ui/input';
import { ConfirmPopover } from '&shared/ui/confirm-popover';
import { Icon } from '&shared/ui/icon';
import { Typography } from '&shared/ui/typography';

export function EditHabitFormSidebar({
	isOpen,
	onClose,
	habitId,
	onCompleteSimpleHabit,
	onFillComplexHabitDayProgress
}: Props) {
	const { goals, editHabitEvent, habit, isViewingToday, currentAppDateStart, deleteHabitEvent } = useUnit({
		goals: goalEntity.outputs.$goals,
		editHabitEvent: inputs.editHabit,
		habit: habitEntity.outputs.getHabitById(habitId),
		isViewingToday: timeService.outputs.$isViewingToday,
		currentAppDateStart: timeService.outputs.$currentAppDateStart,
		deleteHabitEvent: habitEntity.inputs.deleteHabit
	});

	const [isConfirmDeletePopoverOpen, setIsConfirmDeletePopoverOpen] = React.useState(false);
	const [isComplexDeltaFieldVisible, setIsComplexDeltaFieldVisible] = React.useState(false);
	const [complexDeltaFieldValue, setComplexDeltaFieldValue] = React.useState<string | null>(null);
	const sidebarActionMenuRef = React.useRef<HTMLDivElement>(null);
	const deltaFieldInputRef = React.useRef<HTMLInputElement>(null);

	const handleSubmit = (formValues: HabitFormValues) => {
		editHabitEvent({
			habitId,
			formValues
		});
	};

	const form = useForm<HabitFormValues>({
		defaultValues: getDefaultFormValues(habit!),
		resolver: zodResolver(getFormValidator())
	});

	useEventEffect(outputs.habitEdited, () => {
		form.reset();
	});

	const handleFillComplexHabitDayProgressButtonClick = () => {
		if (isComplexDeltaFieldVisible) {
			if (isNaN(Number(complexDeltaFieldValue))) return;
			onFillComplexHabitDayProgress(Number(complexDeltaFieldValue));
			setIsComplexDeltaFieldVisible(false);
			setComplexDeltaFieldValue(null);
			return;
		}

		setIsComplexDeltaFieldVisible(true);
		deltaFieldInputRef.current?.focus();
	};

	const handleDeltaFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setComplexDeltaFieldValue(event.target.value ?? null);
	};

	if (!habit) {
		return null;
	}

	const {
		formState: { isDirty }
	} = form;

	const isSaveChangesButtonVisible = isDirty;
	const isCompleteSimpleHabitButtonVisible =
		!isSaveChangesButtonVisible &&
		habitEntity.lib.isSimpleHabit(habit) &&
		isViewingToday &&
		!habitEntity.lib.isHabitCompletedOnDate(habit, currentAppDateStart);
	const isFillComplexHabitDayProgressButtonVisible =
		!isSaveChangesButtonVisible &&
		isViewingToday &&
		habitEntity.lib.isComplexHabit(habit) &&
		!habitEntity.lib.isHabitCompletedOnDate(habit, currentAppDateStart);

	const closeConfirmationPopover = () => {
		setIsConfirmDeletePopoverOpen(false);
	};

	const handleClose = () => {
		closeConfirmationPopover();
		onClose();
	};

	const handleConfrimDeletion = () => {
		deleteHabitEvent({ habitId });
		handleClose();
	};

	return (
		<Sidebar
			isOpen={isOpen}
			onClose={handleClose}
			actionMenuContentRef={sidebarActionMenuRef}
			actions={[
				<ConfirmPopover
					isOpen={isConfirmDeletePopoverOpen}
					onClose={closeConfirmationPopover}
					confirmButtonAppearance="error"
					portalContainerRef={sidebarActionMenuRef}
					onConfirm={handleConfrimDeletion}
					confirmationText="Подтверди удаление привычки"
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
					<HabitForm goalsToLinkTo={goals} />
					{isDirty && (
						<Button
							variant="button"
							appearance="primary"
							onClick={form.handleSubmit(handleSubmit)}
							className="mx-8 self-stretch"
						>
							Сохранить изменения
						</Button>
					)}
					{isCompleteSimpleHabitButtonVisible && (
						<Button variant="button" appearance="primary" onClick={onCompleteSimpleHabit} className="mx-8 self-stretch">
							Отметить выполнено
						</Button>
					)}
					{isFillComplexHabitDayProgressButtonVisible && (
						<div className={cn('flex justify-end items-center mx-8 relative gap-4')}>
							<Input
								ref={deltaFieldInputRef}
								value={complexDeltaFieldValue ?? ''}
								onChange={handleDeltaFieldChange}
								className={'w-2/5 absolute left-0 top-0 z-0 max-w-2/5'}
								label="Введите количество "
							/>
							<Button
								variant="button"
								appearance="primary"
								onClick={handleFillComplexHabitDayProgressButtonClick}
								className={cn('will-change-auto transition-all z-[1] w-full', {
									'w-[calc(60%-16px)]': isComplexDeltaFieldVisible
								})}
							>
								Ввести прогресс
							</Button>
						</div>
					)}
				</div>
			</FormProvider>
		</Sidebar>
	);
}
