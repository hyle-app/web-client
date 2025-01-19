import { HabitCard, habitEntity } from '&entities/habit';
import { ReminderCard, reminderEntity } from '&entities/reminder';
import { TaskCard, taskEntity } from '&entities/task';
import { Button } from '&shared/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '&shared/ui/collapsible';
import { Icon } from '&shared/ui/icon';
import { Typography } from '&shared/ui/typography';
import { cn, plural } from '&shared/utils';
import { useUnit } from 'effector-react';
import { Props } from './types';
import React from 'react';
import { timeService } from '&shared/services/time';

export const LinkedEntitiesPreview = ({ className, linkedEntities, onEditClick }: Props) => {
	const linkedHabitsCount = linkedEntities.habitIds.length;
	const linkedTasksCount = linkedEntities.taskIds.length;
	const linkedRemindersCount = linkedEntities.reminderIds.length;

	const { tasksList, remindersList, habitsList, selectedAppDateStart } = useUnit({
		tasksList: taskEntity.outputs.$tasksList,
		remindersList: reminderEntity.outputs.$remindersList,
		habitsList: habitEntity.outputs.$habitsList,
		selectedAppDateStart: timeService.outputs.$currentAppDateStart
	});

	const tasksToRender = React.useMemo(
		() => tasksList.filter((task) => linkedEntities.taskIds.includes(task.id)),
		[tasksList, linkedEntities.taskIds]
	);
	const habitsToRender = React.useMemo(
		() => habitsList.filter((habit) => linkedEntities.habitIds.includes(habit.id)),
		[tasksList, linkedEntities.habitIds]
	);

	const remindersToRender = React.useMemo(
		() => remindersList.filter((reminder) => linkedEntities.reminderIds.includes(reminder.id)),
		[tasksList, linkedEntities.reminderIds]
	);

	return (
		<div className={cn('w-full flex flex-col gap-2', className)}>
			{linkedHabitsCount > 0 && (
				<Collapsible className="w-full flex flex-col gap-2">
					<CollapsibleTrigger className="flex items-center justify-between w-full group">
						<Typography className="text-color-gray-80">
							{linkedHabitsCount} {plural(linkedHabitsCount, ['привычка', 'привычки', 'привычек'])}
						</Typography>
						<Icon name="chevron-down" className="transition-transform group-data-[state=open]:rotate-180" />
					</CollapsibleTrigger>
					<CollapsibleContent className="flex flex-col gap-2">
						{habitsToRender.map((habit) => (
							<HabitCard
								key={habit.id}
								title={habit.title}
								emoji={habit.emoji}
								overallProgress={{ current: habit.currentProgress, target: habit.targetProgress }}
								dailyProgress={
									habit.dailyTargetProgressDetails && habit.dailyTargetProgressDetails.targetProgress > 1
										? {
												current: habit.dailyProgressSnaphots[selectedAppDateStart] ?? 0,
												target: habit.dailyTargetProgressDetails.targetProgress,
												label: habit.dailyTargetProgressDetails.label ?? ''
											}
										: null
								}
							/>
						))}
					</CollapsibleContent>
				</Collapsible>
			)}
			{linkedTasksCount > 0 && (
				<Collapsible className="w-full flex flex-col gap-2">
					<CollapsibleTrigger className="flex items-center justify-between w-full group">
						<Typography className="text-color-gray-80">
							{linkedTasksCount} {plural(linkedTasksCount, ['задача', 'задачи', 'задач'])}
						</Typography>
						<Icon name="chevron-down" className="transition-transform group-data-[state=open]:rotate-180" />
					</CollapsibleTrigger>
					<CollapsibleContent className="flex flex-col gap-2">
						{tasksToRender.map((task) => (
							<TaskCard
								key={task.id}
								title={task.title}
								isCompleted={task.completedAt !== null}
								subtasks={task.subtasks}
								targetDate={taskEntity.lib.getTaskTargetDate(task, selectedAppDateStart)}
							/>
						))}
					</CollapsibleContent>
				</Collapsible>
			)}
			{linkedRemindersCount > 0 && (
				<Collapsible className="w-full flex flex-col gap-2">
					<CollapsibleTrigger className="flex items-center justify-between w-full group">
						<Typography className="text-color-gray-80">
							{linkedRemindersCount} {plural(linkedRemindersCount, ['напоминание', 'напоминания', 'напоминаний'])}
						</Typography>
						<Icon name="chevron-down" className="transition-transform group-data-[state=open]:rotate-180" />
					</CollapsibleTrigger>
					<CollapsibleContent className="flex flex-col gap-2">
						{remindersToRender.map((reminder) => (
							<ReminderCard
								key={reminder.id}
								title={reminder.title}
								isCompleted={reminder.completedAt !== null}
								targetDateTime={reminder.targetDateTime}
							/>
						))}
					</CollapsibleContent>
				</Collapsible>
			)}
			<Button
				variant="text"
				appearance="ghost"
				iconSlot={<Icon name="refresh" className="text-color-gray-80 w-4 h-4" />}
				className="mt-2"
				onClick={onEditClick}
			>
				Редактировать
			</Button>
		</div>
	);
};
