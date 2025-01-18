import { timeService } from '&shared/services/time';
import { Button } from '&shared/ui/button';
import { Icon } from '&shared/ui/icon';
import { Typography } from '&shared/ui/typography';
import { useUnit } from 'effector-react';
import { Props } from './types';
import { cn } from '&shared/utils';
import { goalEntity, GoalCard } from '&entities/goal';
import { CreateGoalFormSidebar } from '&features/create-goal';
import React from 'react';
import { EditGoalFormSidebar } from '&features/edit-goal';
import { inputs, outputs } from './model';
import { completeGoalFeature } from '&features/complete-goal';
import { DecomposeGoalSidebar } from '&features/decompose-goal';

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
		<section className={cn('overflow-y-scroll no-scrollbar pb-6', className)} {...attributes}>
			<div className="px-4 py-6 rounded-2xl border-1 border border-color-gray-10 grow-1 min-h-full">
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-2">
						<Icon name="goal" className="text-color-brand-secondary-80 w-6 h-6" />
						<Typography variant="heading-4" className="font-semibold">
							Цели
						</Typography>
					</div>
					<Button variant="icon" appearance="primary" className="w-8 h-8" onClick={() => setIsCreateFormVisible(true)}>
						<Icon name="plus" className="w-4 h-4 text-color-white" />
					</Button>
				</div>
				<div className="flex flex-col gap-4 mt-6">
					{nonOverdueGoals.map((goal) => {
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
				</div>
			</div>
			<CreateGoalFormSidebar
				isOpen={isCreateFormVisible}
				onClose={handleCloseCreateForm}
				DecomposeImplementation={DecomposeGoalSidebar}
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
				/>
			)}
		</section>
	);
});
