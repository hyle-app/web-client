import { GoalForm, GoalFormFieldName, GoalFormValues, LinkedEntities } from '&entities/goal';
import { timeService } from '&shared/services/time';
import { Button } from '&shared/ui/button';
import { Sidebar } from '&shared/ui/sidebar';
import { useEventEffect } from '&shared/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { useUnit } from 'effector-react';
import React from 'react';
import { FormProvider, useForm, useWatch } from 'react-hook-form';
import { getDefaultFormValues, getFormValidator, inputs, outputs } from '../../model';
import type { Props } from './types';

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
			<Sidebar
				isOpen={isOpen}
				onClose={onClose}
				closeOnOverlayClick={!isDecomposeOpen}
				confirmOverlayClose={form.formState.isDirty}
			>
				<FormProvider {...form}>
					<div className="relative flex h-full flex-col justify-between pb-8">
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

						<div className="sticky bottom-0 flex w-full flex-col gap-8 bg-color-bg-95 pt-4">
							<Button
								variant="button"
								appearance="primary"
								onClick={form.handleSubmit(handleSubmit)}
								className="sticky bottom-8 mx-8 self-stretch"
								disabled={isCreatingGoal}
							>
								Создать цель
							</Button>
						</div>
					</div>
				</FormProvider>
			</Sidebar>
		);
	}
);
