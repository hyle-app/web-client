import { Icon } from '&shared/ui/icon';
import { useUnit } from 'effector-react';
import { Props } from './types';
import { goalEntity, GoalCard } from '&entities/goal';
import { inputs, outputs } from './model';
import React from 'react';
import { EditGoalFormSidebar } from '&features/edit-goal';
import { DecomposeGoalSidebar, LinkedEntitiesPreview } from '&features/decompose-goal';
import { EntityColumn } from '&shared/ui/entity-column';

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
		<EntityColumn
			titleSlot="Достижения"
			iconSlot={<Icon name="medal" className="h-6 w-6 text-color-warning" />}
			cardsSlot={achievements.map((achievement) => (
				<GoalCard
					key={achievement.id}
					title={achievement.title}
					emoji={achievement.emoji}
					onClick={() => setSelectedGoalIdEvent(achievement.id)}
					progress={goalEntity.lib.getGoalProgress(achievement)}
				/>
			))}
			className={className}
			footerSlot={
				<>
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
				</>
			}
			{...attributes}
		/>
	);
});
