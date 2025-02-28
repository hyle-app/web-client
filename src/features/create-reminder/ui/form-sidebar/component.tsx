import { useUnit } from 'effector-react';
import { Props } from './types';
import { goalEntity } from '&entities/goal';
import { Sidebar } from '&shared/ui/sidebar';
import { Button } from '&shared/ui/button';
import { ReminderForm } from '&entities/reminder';
import { FormProvider, useForm } from 'react-hook-form';

import { getDefaultFormValues, getFormValidatorScheme, inputs, outputs } from '../../model';
import { ReminderFormValues } from '&entities/reminder/model';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useEventEffect } from '&shared/utils';
import { timeService } from '&shared/services/time';

const minDateTime = new Date(timeService.lib.getCurrentTimestamp());

export const CreateReminderFormSidebar = React.memo(({ isOpen, onClose }: Props) => {
	const { goals, createNewReminderEvent, currentAppDateStart } = useUnit({
		goals: goalEntity.outputs.$goals,
		createNewReminderEvent: inputs.createNewReminder,
		currentAppDateStart: timeService.outputs.$currentAppDateStart
	});

	const handleSubmit = (formValues: ReminderFormValues) => {
		createNewReminderEvent(formValues);
	};

	useEventEffect(outputs.reminderCreated, () => {
		onClose();
	});

	const form = useForm({
		defaultValues: getDefaultFormValues(currentAppDateStart),
		resolver: zodResolver(getFormValidatorScheme(minDateTime))
	});

	React.useEffect(() => {
		if (!isOpen) return;

		form.reset(getDefaultFormValues(currentAppDateStart));
	}, [isOpen]);

	return (
		<Sidebar isOpen={isOpen} onClose={onClose} confirmOverlayClose={form.formState.isDirty}>
			<div className="relative flex h-full flex-col justify-between pb-8">
				<FormProvider {...form}>
					<ReminderForm goalsToLinkTo={goals} withCalendarShortcuts />
				</FormProvider>

				<div className="sticky bottom-0 flex w-full flex-col gap-8 bg-color-bg-95 pt-4">
					<Button
						variant="button"
						appearance="primary"
						onClick={form.handleSubmit(handleSubmit)}
						className="sticky bottom-8 mx-8 self-stretch"
					>
						Создать напоминание
					</Button>
				</div>
			</div>
		</Sidebar>
	);
});
