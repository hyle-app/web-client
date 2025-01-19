import { CompletableReminderCard, reminderEntity, ReminderId } from '&entities/reminder';
import { timeService } from '&shared/services/time';
import { Button } from '&shared/ui/button';
import { Icon } from '&shared/ui/icon';
import { Typography } from '&shared/ui/typography';
import { cn } from '&shared/utils';
import { useUnit } from 'effector-react';

import { CreateReminderFormSidebar } from '&features/create-reminder';
import React from 'react';
import { Props } from './types';
import { EditReminderFormSidebar } from '&features/edit-reminder';
import { toggleReminderCompletionFeature } from '&features/toggle-reminder-completion';

export function ReminderListWidget({ className, ...attributes }: Props) {
	const [isCreateFormVisible, setIsCreateFormVisible] = React.useState(false);
	const [selectedReminderId, setSelectedReminderId] = React.useState<ReminderId | null>(null);

	const { reminders, selectedAppDateStart, realTimestamp, toggleCompletionEvent } = useUnit({
		reminders: reminderEntity.outputs.$currentAppDateReminders,
		selectedAppDateStart: timeService.outputs.$currentAppDateStart,
		realTimestamp: timeService.outputs.$realTimestamp,
		toggleCompletionEvent: toggleReminderCompletionFeature.inputs.toggleReminderCompletion
	});

	const handleCloseCreateForm = React.useCallback(() => {
		setIsCreateFormVisible(false);
	}, []);

	const handleCloseEditForm = React.useCallback(() => {
		setSelectedReminderId(null);
	}, []);

	return (
		<section className={cn('overflow-y-scroll no-scrollbar pb-6', className)} {...attributes}>
			<div className="px-4 py-6 rounded-2xl border-1 border border-color-gray-10 min-h-full ">
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-2">
						<Icon name="alarm-clock" className="text-color-warning w-6 h-6" />
						<Typography variant="heading-4" className="font-semibold">
							Напоминания
						</Typography>
					</div>
					<Button variant="icon" appearance="primary" className="w-8 h-8" onClick={() => setIsCreateFormVisible(true)}>
						<Icon name="plus" className="w-4 h-4 text-color-white" />
					</Button>
				</div>
				<div className="flex flex-col gap-4 mt-6">
					{reminders.map((reminder) => {
						return (
							<CompletableReminderCard
								key={reminder.id}
								title={reminder.title}
								isCompleted={reminder.completedAt !== null}
								onClick={() => setSelectedReminderId(reminder.id)}
								onToggleCompletion={() => toggleCompletionEvent({ reminderId: reminder.id })}
								targetDateTime={reminder.targetDateTime}
								overdueDetails={reminderEntity.lib.getOverdueDetailsOnDate(
									reminder,
									selectedAppDateStart,
									realTimestamp
								)}
							/>
						);
					})}
				</div>
			</div>

			<CreateReminderFormSidebar isOpen={isCreateFormVisible} onClose={handleCloseCreateForm} />
			{selectedReminderId !== null && (
				<EditReminderFormSidebar isOpen={true} onClose={handleCloseEditForm} reminderId={selectedReminderId} />
			)}
		</section>
	);
}
