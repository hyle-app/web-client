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
import { cn, useEventEffect } from '&shared/utils';
import { ConfirmPopover } from '&shared/ui/confirm-popover';
import { Icon } from '&shared/ui/icon';
import { Typography } from '&shared/ui/typography';
import { Input } from '&shared/ui/input';

const MIN_DATE = new Date(timeService.lib.getStartOfTheDay(timeService.lib.getCurrentTimestamp()));

export const EditGoalFormSidebar = React.memo(
	({ isOpen, onClose, goalId, disabled, onFillComplexGoalProgress, onCompleteSimpleGoal }: Props) => {
		const { editGoalEvent, isEditingGoal, goal, deleteGoalEvent } = useUnit({
			editGoalEvent: inputs.editGoal,
			isEditingGoal: outputs.isGoalEditing,
			goal: goalEntity.outputs.getGoalOrAchievementById(goalId),
			deleteGoalEvent: goalEntity.inputs.deleteGoal
		});

		const [isConfirmDeletePopoverOpen, setIsConfirmDeletePopoverOpen] = React.useState(false);
		const sidebarActionMenuRef = React.useRef<HTMLDivElement>(null);
		const [isComplexDeltaFieldVisible, setIsComplexDeltaFieldVisible] = React.useState(false);
		const [complexDeltaFieldValue, setComplexDeltaFieldValue] = React.useState<string | null>(null);
		const deltaFieldInputRef = React.useRef<HTMLInputElement>(null);

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

		const handleDeltaFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
			setComplexDeltaFieldValue(event.target.value ?? null);
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
						<GoalForm withCalendarShortcuts={!disabled} disabled={disabled} />

						{isSaveChangesButtonVisible && (
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
						{isComplexCompleteButtonVisible && (
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
						{isSimpleCompleteButtonVisible && (
							<Button
								variant="button"
								appearance="primary"
								onClick={onCompleteSimpleGoal}
								className="mx-8 self-stretch"
								disabled={isEditingGoal}
							>
								Отметить выполнение
							</Button>
						)}
					</div>
				</FormProvider>
			</Sidebar>
		);
	}
);
