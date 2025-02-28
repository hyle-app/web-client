import { CompletableReminderCard, reminderEntity } from '&entities/reminder';
import { timeService } from '&shared/services/time';
import { Button } from '&shared/ui/button';
import { Icon } from '&shared/ui/icon';
import { useUnit } from 'effector-react';

import { CreateReminderFormSidebar } from '&features/create-reminder';
import React from 'react';
import { Props } from './types';
import { EditReminderFormSidebar } from '&features/edit-reminder';
import { toggleReminderCompletionFeature } from '&features/toggle-reminder-completion';
import { inputs, outputs } from './model';
import { EntityColumn } from '&shared/ui/entity-column';
import { goalEntity } from '&entities/goal';

export function ReminderListWidget({ className, ...attributes }: Props) {
	const [isCreateFormVisible, setIsCreateFormVisible] = React.useState(false);

	const {
		reminders,
		selectedAppDateStart,
		realTimestamp,
		toggleCompletionEvent,
		selectedReminderId,
		setSelectedReminderId,
		resetSelectedReminderId,
		getGoalOrAchievementById
	} = useUnit({
		reminders: reminderEntity.outputs.$currentAppDateReminders,
		selectedAppDateStart: timeService.outputs.$currentAppDateStart,
		realTimestamp: timeService.outputs.$realTimestamp,
		toggleCompletionEvent: toggleReminderCompletionFeature.inputs.toggleReminderCompletion,
		selectedReminderId: outputs.$selectedReminderId,
		setSelectedReminderId: inputs.setSelectedReminderId,
		resetSelectedReminderId: inputs.resetSelectedReminderId,
		getGoalOrAchievementById: goalEntity.outputs.$getGoalOrAchievementById
	});

	const handleCloseCreateForm = React.useCallback(() => {
		setIsCreateFormVisible(false);
	}, []);

	const handleCloseEditForm = React.useCallback(() => {
		resetSelectedReminderId();
	}, []);

	return (
		<EntityColumn
			titleSlot="Напоминания"
			iconSlot={<Icon name="alarm-clock" className="h-6 w-6 text-color-warning" />}
			createButtonSlot={
				<Button variant="icon" appearance="primary" className="h-8 w-8" onClick={() => setIsCreateFormVisible(true)}>
					<Icon name="plus" className="h-4 w-4 text-color-white" />
				</Button>
			}
			className={className}
			cardsSlot={reminders.map((reminder) => {
				return (
					<CompletableReminderCard
						key={reminder.id}
						title={reminder.title}
						relatedGoalName={getGoalOrAchievementById(reminder.linkedGoalId)?.title ?? null}
						isCompleted={reminderEntity.lib.isReminderCompletedOnDay(reminder, selectedAppDateStart)}
						onClick={() => setSelectedReminderId(reminder.id)}
						onToggleCompletion={() => toggleCompletionEvent({ reminderId: reminder.id })}
						targetDateTime={reminder.targetDateTime}
						overdueDetails={reminderEntity.lib.getOverdueDetailsOnDate(reminder, selectedAppDateStart, realTimestamp)}
					/>
				);
			})}
			footerSlot={
				<>
					<CreateReminderFormSidebar isOpen={isCreateFormVisible} onClose={handleCloseCreateForm} />
					{selectedReminderId !== null && (
						<EditReminderFormSidebar isOpen={true} onClose={handleCloseEditForm} reminderId={selectedReminderId} />
					)}
				</>
			}
			{...attributes}
		/>
	);
}
