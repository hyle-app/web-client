import { GoalCard, goalEntity } from '&entities/goal';
import { completeGoalFeature } from '&features/complete-goal';
import { DecomposeGoalSidebar, LinkedEntitiesPreview } from '&features/decompose-goal';
import { EditGoalFormSidebar } from '&features/edit-goal';
import { timeService } from '&shared/services/time';
import { Icon } from '&shared/ui/icon';
import { Typography } from '&shared/ui/typography';
import { cn } from '&shared/utils';
import { useUnit } from 'effector-react';
import React from 'react';
import { inputs, outputs } from './model';
import { Props } from './types';
import { EntityColumn } from '&shared/ui/entity-column';

export function OverdueGoalListWidget({ className, ...attributes }: Props) {
	const {
		overdueGoals,
		realTimestamp,
		setSelectedGoalIdEvent,
		resetSelectedGoalIdEvent,
		selectedGoalId,

		fillComplexGoalProgressEvent,
		completeSimpleGoalEvent
	} = useUnit({
		overdueGoals: goalEntity.outputs.$overdueGoals,
		realTimestamp: timeService.outputs.$realTimestamp,
		selectedGoalId: outputs.$selectedGoalId,
		setSelectedGoalIdEvent: inputs.setSelectedGoalId,
		resetSelectedGoalIdEvent: inputs.resetSelectedGoalId,

		fillComplexGoalProgressEvent: completeGoalFeature.inputs.fillComplexGoalProgress,
		completeSimpleGoalEvent: completeGoalFeature.inputs.completeSimpleGoal
	});

	const handleCloseEditForm = React.useCallback(() => {
		resetSelectedGoalIdEvent();
	}, []);

	if (overdueGoals.length === 0) {
		return null;
	}

	return (
		<EntityColumn
			titleSlot="Просроченные"
			iconSlot={<Icon name="triangle-danger" className="h-6 w-6 text-color-error" />}
			footerSlot={
				<>
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
			cardsSlot={overdueGoals.map((goal) => {
				return (
					<GoalCard
						key={goal.id}
						title={goal.title}
						emoji={goal.emoji}
						progress={goalEntity.lib.getGoalProgress(goal)}
						timeLeft={timeService.lib.getDiffInTimeUnits(realTimestamp, goal.targetDate)}
						overdueDetails={
							realTimestamp > goal.targetDate
								? timeService.lib.getDiffInTimeUnits(goal.targetDate, realTimestamp)
								: null
						}
						onClick={() => setSelectedGoalIdEvent(goal.id)}
					/>
				);
			})}
			className={className}
			{...attributes}
		/>
	);
}
