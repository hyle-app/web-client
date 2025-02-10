import { useUnit } from 'effector-react';
import type { Props } from './types';
import { getDefaultFormValues, getFormValidator, inputs, outputs } from '../../model';
import React from 'react';
import { FormProvider, useForm, useWatch } from 'react-hook-form';
import { GoalForm, GoalFormFieldName, GoalFormValues, LinkedEntities } from '&entities/goal';
import { zodResolver } from '@hookform/resolvers/zod';
import { timeService } from '&shared/services/time';
import { Sidebar } from '&shared/ui/sidebar';
import { Button } from '&shared/ui/button';
import { useEventEffect } from '&shared/utils';

const MIN_DATE = new Date(timeService.lib.getStartOfTheDay(timeService.lib.getCurrentTimestamp()));

export const CreateGoalFormSidebar = React.memo(
	({ isOpen, onClose, DecomposeImplementation, DecomposePreviewImplementation }: Props) => {
		const [isDecomposeOpen, setIsDecomposeOpen] = React.useState(false);
		const { createNewGoalEvent, isCreatingGoal, currentApDateStart } = useUnit({
			createNewGoalEvent: inputs.createNewGoal,
			isCreatingGoal: outputs.isGoalCreating,
			currentApDateStart: timeService.outputs.$currentAppDateStart
		});

		const form = useForm<GoalFormValues>({
			defaultValues: getDefaultFormValues(new Date(currentApDateStart)),
			resolver: zodResolver(getFormValidator(MIN_DATE))
		});

		const handleSubmit = (formValues: GoalFormValues) => {
			createNewGoalEvent(formValues);
		};

		const handleSetLinkedEntities = (linkedEntities: LinkedEntities) => {
			form.setValue(GoalFormFieldName.LinkedEntities, linkedEntities);
		};

		useEventEffect(outputs.goalCreated, onClose);

		React.useEffect(() => {
			if (!isOpen) return;

			form.reset(getDefaultFormValues(new Date(currentApDateStart)));
		}, [isOpen]);

		const linkedEntities = useWatch({ control: form.control, name: GoalFormFieldName.LinkedEntities });

		return (
			<Sidebar isOpen={isOpen} onClose={onClose} closeOnOverlayClick={!isDecomposeOpen} confirmOverlayClose>
				<FormProvider {...form}>
					<div className="flex flex-col justify-between pb-8 h-full relative">
						<GoalForm
							withCalendarShortcuts
							onDecomposeClick={() => setIsDecomposeOpen(true)}
							linkedEntitiesPreviewImpl={
								<DecomposePreviewImplementation
									linkedEntities={linkedEntities}
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

						<Button
							variant="button"
							appearance="primary"
							onClick={form.handleSubmit(handleSubmit)}
							className="mx-8 self-stretch sticky bottom-8"
							disabled={isCreatingGoal}
						>
							Создать цель
						</Button>
					</div>
				</FormProvider>
			</Sidebar>
		);
	}
);
