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
		<Sidebar isOpen={isOpen} onClose={onClose}>
			<FormProvider {...form}>
				<div className="flex flex-col justify-between pb-8 h-full relative">
					<HabitForm goalsToLinkTo={goals} />
					<Button
						variant="button"
						appearance="primary"
						onClick={form.handleSubmit(handleSubmit)}
						className="mx-8 self-stretch sticky bottom-8"
						disabled={isCreatingTask}
					>
						Создать привычку
					</Button>
				</div>
			</FormProvider>
		</Sidebar>
	);
}
