import { timeService } from '&shared/services/time';
import { Icon } from '&shared/ui/icon';
import { Typography } from '&shared/ui/typography';
import { useUnit } from 'effector-react';
import { Props } from './types';
import { cn } from '&shared/utils';
import { goalEntity, GoalCard } from '&entities/goal';
import { inputs, outputs } from './model';
import { EditGoalFormSidebar } from '&features/edit-goal';
import React from 'react';
import { completeGoalFeature } from '&features/complete-goal';

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
		<section className={cn('overflow-y-scroll no-scrollbar pb-6', className)} {...attributes}>
			<div className="px-4 py-6 rounded-2xl border-1 border border-color-gray-10 grow-1 min-h-full">
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-2">
						<Icon name="triangle-danger" className="text-color-error w-6 h-6" />
						<Typography variant="heading-4" className="font-semibold">
							Просроченные
						</Typography>
					</div>
				</div>
				<div className="flex flex-col gap-4 mt-6">
					{overdueGoals.map((goal) => {
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
				</div>
			</div>

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
				/>
			)}
		</section>
	);
}
