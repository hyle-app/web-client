import { goalEntity, GoalForm, GoalFormFieldName, GoalFormValues, LinkedEntities } from '&entities/goal';
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
import { FormProvider, useForm, useWatch } from 'react-hook-form';
import { getDefaultFormValues, getFormValidator, inputs, outputs } from '../../model';
import type { Props } from './types';

const MIN_DATE = new Date(timeService.lib.getStartOfTheDay(timeService.lib.getCurrentTimestamp()));

export const EditGoalFormSidebar = React.memo(
	({
		isOpen,
		onClose,
		goalId,
		disabled,
		onFillComplexGoalProgress,
		onCompleteSimpleGoal,
		DecomposePreviewImplementation,
		DecomposeImplementation
	}: Props) => {
		const { editGoalEvent, isEditingGoal, goal, deleteGoalEvent, linkedEntities } = useUnit({
			editGoalEvent: inputs.editGoal,
			isEditingGoal: outputs.isGoalEditing,
			goal: goalEntity.outputs.getGoalOrAchievementById(goalId),
			deleteGoalEvent: goalEntity.inputs.deleteGoal,
			linkedEntities: goalEntity.outputs.getLinkedEntitiesOfGoal(goalId)
		});

		const [isDecomposeOpen, setIsDecomposeOpen] = React.useState(false);
		const [isConfirmDeletePopoverOpen, setIsConfirmDeletePopoverOpen] = React.useState(false);
		const sidebarActionMenuRef = React.useRef<HTMLDivElement>(null);
		const [isComplexDeltaFieldVisible, setIsComplexDeltaFieldVisible] = React.useState(false);
		const [complexDeltaFieldValue, setComplexDeltaFieldValue] = React.useState<string | null>(null);
		const deltaFieldInputRef = React.useRef<HTMLInputElement>(null);

		const form = useForm<GoalFormValues>({
			defaultValues: getDefaultFormValues(goal!, linkedEntities),
			resolver: zodResolver(getFormValidator(goal!, MIN_DATE))
		});

		const handleSubmit = (formValues: GoalFormValues) => {
			editGoalEvent({ formValues, goalId });
		};

		const {
			formState: { isDirty },
			getValues
		} = form;

		useEventEffect(outputs.goalEdited, () => {
			form.reset(
				{ ...getValues() },
				{ keepDirty: false, keepErrors: false, keepIsSubmitted: false, keepIsValid: true }
			);
		});

		React.useEffect(() => {
			if (isOpen) return;

			form.reset();
		}, [isOpen]);

		// NOTE: This is a workaround for the case when linkedEntities are not loaded yet
		const linkedEntitiesRef = React.useRef(linkedEntities);
		React.useEffect(() => {
			if (linkedEntitiesRef.current === null && linkedEntities !== null) {
				form.setValue(GoalFormFieldName.LinkedEntities, getDefaultFormValues(goal!, linkedEntities).linkedEntities);
				linkedEntitiesRef.current = linkedEntities;
			}
		}, [linkedEntities]);

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

		const handleDeltaFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
			setComplexDeltaFieldValue(event.target.value ?? null);
		};

		const handleSetLinkedEntities = (linkedEntities: LinkedEntities) => {
			form.setValue(GoalFormFieldName.LinkedEntities, linkedEntities, { shouldDirty: true });
		};

		const handleFillComplexHabitDayProgressButtonClick = () => {
			if (isComplexDeltaFieldVisible) {
				if (isNaN(Number(complexDeltaFieldValue))) return;
				onFillComplexGoalProgress?.(Number(complexDeltaFieldValue));
				setIsComplexDeltaFieldVisible(false);
				setComplexDeltaFieldValue(null);
				return;
			}

			setIsComplexDeltaFieldVisible(true);
			deltaFieldInputRef.current?.focus();
		};

		const isSaveChangesButtonVisible = isDirty && !disabled;
		const isComplexCompleteButtonVisible =
			!isSaveChangesButtonVisible &&
			!disabled &&
			goalEntity.lib.isComplexGoal(goal!) &&
			!goalEntity.lib.isGoalCompleted(goal!);
		const isSimpleCompleteButtonVisible =
			!isSaveChangesButtonVisible &&
			!disabled &&
			!goalEntity.lib.isComplexGoal(goal!) &&
			!goalEntity.lib.isGoalCompleted(goal!);

		const linkedEntitiesIds = useWatch({ control: form.control, name: GoalFormFieldName.LinkedEntities });

		return (
			<Sidebar
				confirmOverlayClose={form.formState.isDirty}
				isOpen={isOpen}
				onClose={handleClose}
				actionMenuContentRef={sidebarActionMenuRef}
				onCloseActionMenu={handleActionMenuClose}
				foreheadSlot={
					<Typography className="text-color-gray-50" variant="caption-1">
						Цель / Создана {dayjs(goal!.createdAt).format('DD MMM YYYY')}
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
						<GoalForm
							withCalendarShortcuts={!disabled}
							disabled={disabled}
							onDecomposeClick={() => setIsDecomposeOpen(true)}
							linkedEntitiesPreviewImpl={
								<DecomposePreviewImplementation
									linkedEntities={linkedEntitiesIds}
									onEditClick={() => setIsDecomposeOpen(true)}
								/>
							}
						/>
						<DecomposeImplementation
							value={form.watch(GoalFormFieldName.LinkedEntities)}
							isOpen={isDecomposeOpen}
							onClose={() => setIsDecomposeOpen(false)}
							onApplyEntities={handleSetLinkedEntities}
						/>

						<div className="sticky bottom-8 flex w-full flex-col gap-8 bg-color-bg-95 px-8 !pb-8 pt-4">
							{goalEntity.lib.isComplexGoal(goal!) && (
								<ProgressLine
									customLabel={goal?.progress?.label || undefined}
									value={goal?.progress?.currentProgress || 0}
									maxValue={goal?.progress?.targetProgress || 0}
								/>
							)}
							{isSaveChangesButtonVisible && (
								<Button
									variant="button"
									appearance="primary"
									onClick={form.handleSubmit(handleSubmit)}
									className="self-stretch"
									disabled={isEditingGoal}
								>
									Сохранить изменения
								</Button>
							)}
							{isComplexCompleteButtonVisible && (
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
							{isSimpleCompleteButtonVisible && (
								<Button
									variant="button"
									appearance="primary"
									onClick={onCompleteSimpleGoal}
									className="w-full"
									disabled={isEditingGoal}
								>
									Отметить выполнено
								</Button>
							)}
						</div>
					</div>
				</FormProvider>
			</Sidebar>
		);
	}
);
