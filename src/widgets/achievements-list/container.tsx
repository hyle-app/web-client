import { Icon } from '&shared/ui/icon';
import { Typography } from '&shared/ui/typography';
import { useUnit } from 'effector-react';
import { Props } from './types';
import { cn } from '&shared/utils';
import { goalEntity, GoalCard } from '&entities/goal';
import { inputs, outputs } from './model';
import React from 'react';
import { EditGoalFormSidebar } from '&features/edit-goal';
import { DecomposeGoalSidebar, LinkedEntitiesPreview } from '&features/decompose-goal';

export const AchievementsListWidget = React.memo(({ className, ...attributes }: Props) => {
	const { achievements, setSelectedGoalIdEvent, selectedGoalId, resetSelectedGoalIdEvent } = useUnit({
		achievements: goalEntity.outputs.$achievements,
		selectedGoalId: outputs.$selectedGoalId,
		setSelectedGoalIdEvent: inputs.setSelectedGoalId,
		resetSelectedGoalIdEvent: inputs.resetSelectedGoalId
	});

	const handleCloseEditForm = React.useCallback(() => {
		resetSelectedGoalIdEvent();
	}, []);

	if (achievements.length === 0) {
		return null;
	}

	return (
		<section className={cn('overflow-y-scroll no-scrollbar pb-6', className)} {...attributes}>
			<div className="px-4 py-6 rounded-2xl border-1 border border-color-gray-10 grow-1 min-h-full">
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-2">
						<Icon name="medal" className="text-color-warning w-6 h-6" />
						<Typography variant="heading-4" className="font-semibold">
							Достижения
						</Typography>
					</div>
				</div>
				<div className="flex flex-col gap-4 mt-6">
					{achievements.map((achievement) => {
						return (
							<GoalCard
								key={achievement.id}
								title={achievement.title}
								emoji={achievement.emoji}
								onClick={() => setSelectedGoalIdEvent(achievement.id)}
								progress={goalEntity.lib.getGoalProgress(achievement)}
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
					DecomposeImplementation={DecomposeGoalSidebar}
					DecomposePreviewImplementation={LinkedEntitiesPreview}
					disabled
				/>
			)}
		</section>
	);
});
