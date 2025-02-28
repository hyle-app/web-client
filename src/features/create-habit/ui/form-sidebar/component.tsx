import { FormProvider, useForm } from 'react-hook-form';
import { useUnit } from 'effector-react';
import { Props } from './types';
import { goalEntity } from '&entities/goal';
import { Sidebar } from '&shared/ui/sidebar';
import { Button } from '&shared/ui/button';
import { getDefaultFormValues, getFormValidator, inputs, outputs } from '../../model';
import { useEventEffect } from '&shared/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { HabitForm, HabitFormValues } from '&entities/habit';
import React from 'react';

export function CreateHabitFormSidebar({ isOpen, onClose }: Props) {
	const { goals, createNewTaskEvent, isCreatingTask } = useUnit({
		goals: goalEntity.outputs.$goals,
		createNewTaskEvent: inputs.createNewHabit,
		isCreatingTask: outputs.$isCreatingHabit
	});

	useEventEffect(outputs.habitCreated, onClose);

	const handleSubmit = (formValues: HabitFormValues) => {
		createNewTaskEvent(formValues);
	};

	const form = useForm<HabitFormValues>({
		defaultValues: getDefaultFormValues(),
		resolver: zodResolver(getFormValidator())
	});

	React.useEffect(() => {
		if (!isOpen) return;

		form.reset(getDefaultFormValues());
	}, [isOpen]);

	return (
		<Sidebar isOpen={isOpen} onClose={onClose} confirmOverlayClose={form.formState.isDirty}>
			<FormProvider {...form}>
				<div className="relative flex h-full flex-col justify-between pb-8">
					<HabitForm goalsToLinkTo={goals} />

					<div className="sticky bottom-0 flex w-full flex-col gap-8 bg-color-bg-95 pt-4">
						<Button
							variant="button"
							appearance="primary"
							onClick={form.handleSubmit(handleSubmit)}
							className="sticky bottom-8 mx-8 self-stretch"
							disabled={isCreatingTask}
						>
							Создать привычку
						</Button>
					</div>
				</div>
			</FormProvider>
		</Sidebar>
	);
}
