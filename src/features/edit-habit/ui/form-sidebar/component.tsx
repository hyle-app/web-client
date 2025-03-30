import { goalEntity } from '&entities/goal';
import { habitEntity, HabitForm, HabitFormValues } from '&entities/habit';
import { timeService } from '&shared/services/time';
import { Button } from '&shared/ui/button';
import { ConfirmPopover } from '&shared/ui/confirm-popover';
import { Input } from '&shared/ui/input';
import { ProgressLine } from '&shared/ui/progress-line';

import { Sidebar } from '&shared/ui/sidebar';
import { Typography } from '&shared/ui/typography';
import { cn, useEventEffect } from '&shared/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import dayjs from 'dayjs';
import { useUnit } from 'effector-react';
import { Trash } from 'lucide-react';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { getDefaultFormValues, getFormValidator, inputs, outputs } from '../../model';
import { Props } from './types';
import { Icon } from '&shared/ui/icon';

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

	const { reset, getValues } = form;
	useEventEffect(outputs.habitEdited, () => {
		reset({ ...getValues() }, { keepDirty: false, keepErrors: false, keepIsSubmitted: false, keepIsValid: true });
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
			confirmOverlayClose={form.formState.isDirty}
			isOpen={isOpen}
			onClose={handleClose}
			actionMenuContentRef={sidebarActionMenuRef}
			foreheadSlot={
				<Typography className="flex items-center gap-2 text-color-gray-50" variant="caption-1">
					{habit!.completedAt && <Icon name="check" className="w-[9px] text-gray-50" />}
					<span>Привычка / Создана {dayjs(habit!.createdAt).format('DD MMM YYYY')}</span>
				</Typography>
			}
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
						iconSlot={<Trash className="text-color-text-and-icon-80" />}
						labelSlot={<Typography>Удалить</Typography>}
						onClick={() => setIsConfirmDeletePopoverOpen(true)}
					/>
				</ConfirmPopover>
			]}
		>
			<FormProvider {...form}>
				<div className="relative flex h-full flex-col justify-between">
					<HabitForm goalsToLinkTo={goals} />
					<div className="sticky bottom-8 flex w-full flex-col gap-8 bg-color-bg-95 px-8 pb-8 pt-4">
						<div className="flex flex-col gap-1">
							{habitEntity.lib.isComplexHabit(habit) && (
								<ProgressLine
									customLabel={habit.dailyTargetProgressDetails?.label || undefined}
									value={habit.dailyProgressSnaphots[currentAppDateStart] ?? 0}
									maxValue={habit.dailyTargetProgressDetails!.targetProgress}
								/>
							)}
							<ProgressLine
								value={habit.currentProgress}
								maxValue={habit.targetProgress}
								direction="inverse"
								withDayLabel
								variant="secondary"
								labelRowEndSlot={
									habit.penalty && (
										<Typography className="font-semibold text-color-gray-30">Штраф: {habit.penalty}</Typography>
									)
								}
							/>
						</div>
						{isDirty && (
							<Button
								variant="button"
								appearance="primary"
								onClick={form.handleSubmit(handleSubmit)}
								className="w-full"
							>
								Сохранить изменения
							</Button>
						)}
						{isCompleteSimpleHabitButtonVisible && (
							<Button variant="button" appearance="primary" onClick={onCompleteSimpleHabit} className="w-full">
								Отметить выполнено
							</Button>
						)}
						{isFillComplexHabitDayProgressButtonVisible && (
							<div className={cn('relative flex w-full items-center justify-end gap-4')}>
								<Input
									ref={deltaFieldInputRef}
									value={complexDeltaFieldValue ?? ''}
									onChange={handleDeltaFieldChange}
									className={
										'max-w-2/5 absolute left-0 top-0 z-0 w-2/5 focus:border-color-brand-primary-50 focus:outline-none'
									}
									label="Введите количество "
								/>
								<Button
									variant="button"
									appearance="primary"
									onClick={handleFillComplexHabitDayProgressButtonClick}
									className={cn('z-[1] w-full transition-all will-change-auto', {
										'w-[calc(60%-16px)]': isComplexDeltaFieldVisible
									})}
								>
									Ввести прогресс
								</Button>
							</div>
						)}
					</div>
				</div>
			</FormProvider>
		</Sidebar>
	);
}
