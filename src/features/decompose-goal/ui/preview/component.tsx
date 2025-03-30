import { HabitCard, habitEntity } from '&entities/habit';
import { ReminderCard, reminderEntity } from '&entities/reminder';
import { TaskCard, taskEntity } from '&entities/task';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '&shared/ui/collapsible';
import { Icon } from '&shared/ui/icon';
import { Typography } from '&shared/ui/typography';
import { cn, plural } from '&shared/utils';
import { useUnit } from 'effector-react';
import { Props } from './types';
import React from 'react';
import { timeService } from '&shared/services/time';

export const LinkedEntitiesPreview = ({ className, linkedEntities, onDetachEntity }: Props) => {
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
		<div className={cn('flex w-full flex-col gap-2', className)}>
			{linkedHabitsCount > 0 && (
				<Collapsible className="flex w-full flex-col gap-2">
					<CollapsibleTrigger className="group flex w-full items-center justify-between">
						<Typography className="text-color-gray-80">
							{linkedHabitsCount} {plural(linkedHabitsCount, ['привычка', 'привычки', 'привычек'])}
						</Typography>
						<Icon name="chevron-down" className="transition-transform group-data-[state=open]:rotate-180" />
					</CollapsibleTrigger>
					<CollapsibleContent className="flex flex-col gap-2">
						{habitsToRender.map((habit) => (
							<div className="group flex gap-3">
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
								<button
									className="flex w-8 items-center justify-center self-stretch opacity-0 transition-opacity group-focus-within:opacity-100 group-hover:opacity-100"
									onClick={() => onDetachEntity(habit.id, 'habit')}
								>
									<Icon name="plus" className="h-5 w-5 rotate-45 text-color-error" />
								</button>
							</div>
						))}
					</CollapsibleContent>
				</Collapsible>
			)}
			{linkedTasksCount > 0 && (
				<Collapsible className="flex w-full flex-col gap-2">
					<CollapsibleTrigger className="group flex w-full items-center justify-between">
						<Typography className="text-color-gray-80">
							{linkedTasksCount} {plural(linkedTasksCount, ['задача', 'задачи', 'задач'])}
						</Typography>
						<Icon name="chevron-down" className="transition-transform group-data-[state=open]:rotate-180" />
					</CollapsibleTrigger>
					<CollapsibleContent className="flex flex-col gap-2">
						{tasksToRender.map((task) => (
							<div className="group flex gap-3">
								<TaskCard
									key={task.id}
									title={task.title}
									isCompleted={task.completedAt !== null}
									subtasks={task.subtasks}
									targetDate={taskEntity.lib.getTaskTargetDate(task, selectedAppDateStart)}
								/>

								<button
									className="flex w-8 items-center justify-center self-stretch opacity-0 transition-opacity group-focus-within:opacity-100 group-hover:opacity-100"
									onClick={() => onDetachEntity(task.id, 'task')}
								>
									<Icon name="plus" className="h-5 w-5 rotate-45 text-color-error" />
								</button>
							</div>
						))}
					</CollapsibleContent>
				</Collapsible>
			)}
			{linkedRemindersCount > 0 && (
				<Collapsible className="flex w-full flex-col gap-2">
					<CollapsibleTrigger className="group flex w-full items-center justify-between">
						<Typography className="text-color-gray-80">
							{linkedRemindersCount} {plural(linkedRemindersCount, ['напоминание', 'напоминания', 'напоминаний'])}
						</Typography>
						<Icon name="chevron-down" className="transition-transform group-data-[state=open]:rotate-180" />
					</CollapsibleTrigger>
					<CollapsibleContent className="flex flex-col gap-2">
						{remindersToRender.map((reminder) => (
							<div className="group flex gap-3">
								<ReminderCard
									key={reminder.id}
									title={reminder.title}
									isCompleted={reminder.completedAt !== null}
									targetDateTime={reminder.targetDateTime}
								/>
								<button
									className="flex w-8 items-center justify-center self-stretch opacity-0 transition-opacity group-focus-within:opacity-100 group-hover:opacity-100"
									onClick={() => onDetachEntity(reminder.id, 'reminder')}
								>
									<Icon name="plus" className="h-5 w-5 rotate-45 text-color-error" />
								</button>
							</div>
						))}
					</CollapsibleContent>
				</Collapsible>
			)}
		</div>
	);
};
