import { GoalCard, goalEntity } from '&entities/goal';
import { completeGoalFeature } from '&features/complete-goal';
import { CreateGoalFormSidebar } from '&features/create-goal';
import { DecomposeGoalSidebar, LinkedEntitiesPreview } from '&features/decompose-goal';
import { EditGoalFormSidebar } from '&features/edit-goal';
import { timeService } from '&shared/services/time';
import { Button } from '&shared/ui/button';
import { EntityColumn } from '&shared/ui/entity-column';
import { Icon } from '&shared/ui/icon';
import { useUnit } from 'effector-react';
import React from 'react';
import { inputs, outputs } from './model';
import { Props } from './types';

export const GoalListWidget = React.memo(({ className, ...attributes }: Props) => {
	const {
		nonOverdueGoals,
		realTimestamp,

		setSelectedGoalIdEvent,
		resetSelectedGoalIdEvent,
		completeSimpleGoalEvent,
		fillComplexGoalProgressEvent,
		selectedGoalId
	} = useUnit({
		nonOverdueGoals: goalEntity.outputs.$nonOverdueGoals,
		selectedAppDateStart: timeService.outputs.$currentAppDateStart,
		realTimestamp: timeService.outputs.$realTimestamp,
		selectedGoalId: outputs.$selectedGoalId,
		setSelectedGoalIdEvent: inputs.setSelectedGoalId,
		resetSelectedGoalIdEvent: inputs.resetSelectedGoalId,
		fillComplexGoalProgressEvent: completeGoalFeature.inputs.fillComplexGoalProgress,
		completeSimpleGoalEvent: completeGoalFeature.inputs.completeSimpleGoal
	});

	const [isCreateFormVisible, setIsCreateFormVisible] = React.useState(false);

	const handleCloseEditForm = React.useCallback(() => {
		resetSelectedGoalIdEvent();
	}, []);

	const handleCloseCreateForm = React.useCallback(() => {
		setIsCreateFormVisible(false);
	}, []);

	return (
		<EntityColumn
			titleSlot="Цели"
			iconSlot={<Icon name="goal" className="h-6 w-6 text-color-brand-secondary-80" />}
			createButtonSlot={
				<Button variant="icon" appearance="primary" className="h-8 w-8" onClick={() => setIsCreateFormVisible(true)}>
					<Icon name="plus" className="h-4 w-4 text-color-white" />
				</Button>
			}
			className={className}
			footerSlot={
				<>
					<CreateGoalFormSidebar
						isOpen={isCreateFormVisible}
						onClose={handleCloseCreateForm}
						DecomposeImplementation={DecomposeGoalSidebar}
						DecomposePreviewImplementation={LinkedEntitiesPreview}
					/>
					{selectedGoalId && (
						<EditGoalFormSidebar
							isOpen={Boolean(selectedGoalId)}
							onClose={handleCloseEditForm}
							goalId={selectedGoalId}
							onFillComplexGoalProgress={(delta) =>
								fillComplexGoalProgressEvent({
									goalId: selectedGoalId,
									progressDelta: delta
								})
							}
							onCompleteSimpleGoal={() => completeSimpleGoalEvent({ goalId: selectedGoalId })}
							DecomposeImplementation={DecomposeGoalSidebar}
							DecomposePreviewImplementation={LinkedEntitiesPreview}
						/>
					)}
				</>
			}
			cardsSlot={nonOverdueGoals.map((goal) => {
				return (
					<GoalCard
						key={goal.id}
						title={goal.title}
						emoji={goal.emoji}
						progress={goalEntity.lib.getGoalProgress(goal)}
						onClick={() => setSelectedGoalIdEvent(goal.id)}
						timeLeft={timeService.lib.getDiffInTimeUnits(realTimestamp, goal.targetDate)}
						overdueDetails={
							realTimestamp > goal.targetDate
								? timeService.lib.getDiffInTimeUnits(goal.targetDate, realTimestamp)
								: null
						}
					/>
				);
			})}
			{...attributes}
		/>
	);
});
