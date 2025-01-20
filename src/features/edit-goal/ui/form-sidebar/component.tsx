import { useUnit } from 'effector-react';
import type { Props } from './types';
import { getDefaultFormValues, getFormValidator, inputs, outputs } from '../../model';
import React from 'react';
import { FormProvider, useForm, useWatch } from 'react-hook-form';
import { goalEntity, GoalForm, GoalFormFieldName, GoalFormValues, LinkedEntities } from '&entities/goal';
import { zodResolver } from '@hookform/resolvers/zod';
import { timeService } from '&shared/services/time';
import { Sidebar } from '&shared/ui/sidebar';
import { Button } from '&shared/ui/button';
import { cn, useEventEffect } from '&shared/utils';
import { ConfirmPopover } from '&shared/ui/confirm-popover';
import { Icon } from '&shared/ui/icon';
import { Typography } from '&shared/ui/typography';
import { Input } from '&shared/ui/input';
import { ProgressLine } from '&shared/ui/progress-line';

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
			formState: { isDirty }
		} = form;

		useEventEffect(outputs.goalEdited, () => {
			form.reset(getDefaultFormValues(goal!, linkedEntities));
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
			form.setValue(GoalFormFieldName.LinkedEntities, linkedEntities);
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
						<GoalForm
							withCalendarShortcuts={!disabled}
							disabled={disabled}
							onDecomposeClick={() => setIsDecomposeOpen(true)}
							linkedEntitiesPreviewImpl={
								<DecomposePreviewImplementation
									linkedEntities={linkedEntitiesIds}
									onEditClick={() => setIsDecomposeOpen(true)}
									interactive={!disabled}
								/>
							}
						/>
						<DecomposeImplementation
							value={form.watch(GoalFormFieldName.LinkedEntities)}
							isOpen={isDecomposeOpen}
							onClose={() => setIsDecomposeOpen(false)}
							onApplyEntities={handleSetLinkedEntities}
						/>

						<div className="w-full px-8 flex flex-col gap-8">
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
								<div className={cn('flex justify-end items-center 8 relative gap-4 w-full')}>
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
							{isSimpleCompleteButtonVisible && (
								<Button
									variant="button"
									appearance="primary"
									onClick={onCompleteSimpleGoal}
									className="w-full"
									disabled={isEditingGoal}
								>
									Отметить выполнение
								</Button>
							)}
						</div>
					</div>
				</FormProvider>
			</Sidebar>
		);
	}
);
