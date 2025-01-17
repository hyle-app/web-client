import { useUnit } from 'effector-react';
import type { LinkedEntities, Props } from './types';
import { getDefaultFormValues, getFormValidator, inputs, outputs } from '../../model';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { GoalForm, GoalFormValues } from '&entities/goal';
import { zodResolver } from '@hookform/resolvers/zod';
import { timeService } from '&shared/services/time';
import { Sidebar } from '&shared/ui/sidebar';
import { Button } from '&shared/ui/button';
import { useEventEffect } from '&shared/utils';

const MIN_DATE = new Date(timeService.lib.getStartOfTheDay(timeService.lib.getCurrentTimestamp()));

export const CreateGoalFormSidebar = React.memo(({ isOpen, onClose, DecomposeImplementation }: Props) => {
	const [isDecomposeOpen, setIsDecomposeOpen] = React.useState(false);
	const [linkedEntities, setLinkedEntities] = React.useState<LinkedEntities>({
		linkedReminderIds: [],
		linkedTasksIds: [],
		linkedHabitIds: []
	});
	const { createNewGoalEvent, isCreatingGoal } = useUnit({
		createNewGoalEvent: inputs.createNewGoal,
		isCreatingGoal: outputs.isGoalCreating
	});

	const form = useForm<GoalFormValues>({
		defaultValues: getDefaultFormValues(MIN_DATE),
		resolver: zodResolver(getFormValidator(MIN_DATE))
	});

	const handleSubmit = (formValues: GoalFormValues) => {
		createNewGoalEvent(formValues);
	};

	useEventEffect(outputs.goalCreated, onClose);

	React.useEffect(() => {
		if (isOpen) return;

		form.reset();
	}, [isOpen]);

	return (
		<Sidebar isOpen={isOpen} onClose={onClose}>
			<FormProvider {...form}>
				<div className="flex flex-col justify-between pb-8 h-full">
					<GoalForm withCalendarShortcuts />
					<DecomposeImplementation
						isOpen={isDecomposeOpen}
						onClose={() => setIsDecomposeOpen(false)}
						onApplyEntities={setLinkedEntities}
					/>

					<Button
						variant="button"
						appearance="primary"
						onClick={form.handleSubmit(handleSubmit)}
						className="mx-8 self-stretch"
						disabled={isCreatingGoal}
					>
						Создать цель
					</Button>
				</div>
			</FormProvider>
		</Sidebar>
	);
});
