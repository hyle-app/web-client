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
import { HabitListWidget } from '&widgets/habit-list';

export function EditHabitFormSidebar({
	isOpen,
	onClose,
	habitId,
	onCompleteSimpleHabit,
	onFillComplexHabitDayProgress
}: Props) {
	const { goals, editHabitEvent, habit, isViewingToday, currentAppDateStart } = useUnit({
		goals: goalEntity.outputs.$goals,
		editHabitEvent: inputs.editHabit,
		habit: habitEntity.outputs.getHabitById(habitId),
		isViewingToday: timeService.outputs.$isViewingToday,
		currentAppDateStart: timeService.outputs.$currentAppDateStart
	});

	const deltaFieldInputRef = React.useRef<HTMLInputElement>(null);
	const [isComplexDeltaFieldVisible, setIsComplexDeltaFieldVisible] = React.useState(false);
	const [complexDeltaFieldValue, setComplexDeltaFieldValue] = React.useState<string | null>(null);

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

	return (
		<Sidebar isOpen={isOpen} onClose={onClose}>
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
