import { Sidebar } from '&shared/ui/sidebar';
import { Typography } from '&shared/ui/typography';
import React from 'react';
import { Props } from './types';
import { Icon } from '&shared/ui/icon';
import { Input } from '&shared/ui/input';
import { TaskCard, taskEntity } from '&entities/task';
import { ReminderCard, reminderEntity } from '&entities/reminder';
import { HabitCard, habitEntity } from '&entities/habit';
import { useUnit } from 'effector-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '&shared/ui/collapsible';
import { timeService } from '&shared/services/time';
import { cn } from '&shared/utils';
import { Button } from '&shared/ui/button';
import { LinkedEntities } from '&entities/goal';

export const DecomposeGoalSidebar = ({ onApplyEntities, isOpen, onClose, className, value }: Props) => {
	const { tasksList, remindersList, habitsList, selectedAppDateStart } = useUnit({
		tasksList: taskEntity.outputs.$tasksList,
		remindersList: reminderEntity.outputs.$remindersList,
		habitsList: habitEntity.outputs.$habitsList,
		selectedAppDateStart: timeService.outputs.$currentAppDateStart
	});
	const [linkedEntities, setLinkedEntities] = React.useState<LinkedEntities>({
		taskIds: [],
		reminderIds: [],
		habitIds: []
	});

	React.useEffect(() => {
		setLinkedEntities(value);
	}, [value]);

	const [searchQuery, setSearchQuery] = React.useState('');

	const handleApplyEntities = () => {
		onApplyEntities(linkedEntities);
		setLinkedEntities({ taskIds: [], reminderIds: [], habitIds: [] });
		onClose();
	};

	const { selectedEntitiesCount, totalEntitiesCount } = React.useMemo(() => {
		const selectedEntitiesCount =
			linkedEntities.taskIds.length + linkedEntities.reminderIds.length + linkedEntities.habitIds.length;
		const totalEntitiesCount = tasksList.length + remindersList.length + habitsList.length;

		return { selectedEntitiesCount, totalEntitiesCount };
	}, [linkedEntities, habitsList, remindersList, tasksList]);

	const [mode, setMode] = React.useState<'active' | 'all'>('all');

	const { tasksListToRender, habitsListToRender, remindersListToRender } = React.useMemo(() => {
		return {
			tasksListToRender: tasksList.filter(
				(task) => task.title.toLowerCase().includes(searchQuery.toLowerCase()) && (mode === 'all' || !task.completedAt)
			),
			habitsListToRender: habitsList.filter(
				(habit) =>
					habit.title.toLowerCase().includes(searchQuery.toLowerCase()) && (mode === 'all' || !habit.completedAt)
			),
			remindersListToRender: remindersList.filter(
				(reminder) =>
					reminder.title.toLowerCase().includes(searchQuery.toLowerCase()) && (mode === 'all' || !reminder.completedAt)
			)
		};
	}, [searchQuery, tasksList, habitsList, remindersList, mode]);

	const handleSelectEntity = (kind: 'task' | 'habit' | 'reminder') => (entityId: string) => {
		setLinkedEntities((prev) => {
			const entityIds = prev[(kind + 'Ids') as keyof LinkedEntities];
			const isEntitySelected = entityIds.includes(entityId);

			if (isEntitySelected) {
				return {
					...prev,
					[kind + 'Ids']: entityIds.filter((id) => id !== entityId)
				};
			}

			return {
				...prev,
				[kind + 'Ids']: [...entityIds, entityId]
			};
		});
	};

	const toggleMode = () => {
		setMode((prev) => (prev === 'active' ? 'all' : 'active'));
	};

	return (
		<Sidebar isOpen={isOpen} onClose={onClose} className={className} confirmOverlayClose>
			<div className="relative flex grow flex-col gap-6 px-8 pt-4">
				<div className="flex gap-4">
					<button>
						<Icon name="arrow-left" className="h-8 w-8" />
					</button>
					<Typography variant="heading-3" className="font-semibold">
						Прикрепить к цели
					</Typography>
				</div>

				<Input label="Поиск" value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} />
				<div className="flex justify-between">
					<Typography className="text-color-gray-80">
						Выбрано {selectedEntitiesCount}/{totalEntitiesCount}
					</Typography>
					<button onClick={toggleMode}>
						<Typography className="text-color-brand-primary-50">{{ all: 'Все', active: 'Активные' }[mode]}</Typography>
					</button>
				</div>

				<Collapsible className={cn({ hidden: habitsListToRender.length === 0 })}>
					<CollapsibleTrigger className="group flex w-full items-center justify-between">
						<div className="flex items-center gap-4 p-6">
							<Icon name="habit" className="h-5 w-5" />
							<Typography variant="heading-4" className="font-semibold">
								Привычки
							</Typography>
						</div>
						<Icon name="chevron-down" className="transition-transform group-data-[state=open]:rotate-180" />
					</CollapsibleTrigger>
					<CollapsibleContent>
						<div className="flex flex-col gap-4">
							{habitsListToRender.map((habit) => (
								<HabitCard
									className={cn({ 'bg-color-select-card-bg': linkedEntities.habitIds.includes(habit.id) })}
									key={habit.id}
									title={habit.title}
									emoji={habit.emoji}
									onClick={() => handleSelectEntity('habit')(habit.id)}
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
						</div>
					</CollapsibleContent>
				</Collapsible>

				<Collapsible className={cn({ hidden: tasksListToRender.length === 0 })}>
					<CollapsibleTrigger className="group flex w-full items-center justify-between">
						<div className="flex items-center gap-4 p-6">
							<Icon name="flag" className="h-5 w-5" />
							<Typography variant="heading-4" className="font-semibold">
								Задачи
							</Typography>
						</div>
						<Icon name="chevron-down" className="transition-transform group-data-[state=open]:rotate-180" />
					</CollapsibleTrigger>
					<CollapsibleContent>
						<div className="flex flex-col gap-4">
							{tasksListToRender.map((task) => (
								<TaskCard
									className={cn({ 'bg-color-select-card-bg': linkedEntities.taskIds.includes(task.id) })}
									key={task.id}
									title={task.title}
									isCompleted={task.completedAt !== null}
									subtasks={task.subtasks}
									targetDate={taskEntity.lib.getTaskTargetDate(task, selectedAppDateStart)}
									onClick={() => handleSelectEntity('task')(task.id)}
								/>
							))}
						</div>
					</CollapsibleContent>
				</Collapsible>

				<Collapsible className={cn({ hidden: remindersListToRender.length === 0 })}>
					<CollapsibleTrigger className="group flex w-full items-center justify-between">
						<div className="flex items-center gap-4 p-6">
							<Icon name="alarm-clock" className="h-5 w-5" />
							<Typography variant="heading-4" className="font-semibold">
								Напоминания
							</Typography>
						</div>
						<Icon name="chevron-down" className="transition-transform group-data-[state=open]:rotate-180" />
					</CollapsibleTrigger>
					<CollapsibleContent>
						<div className="flex flex-col gap-4">
							{remindersListToRender.map((reminder) => (
								<ReminderCard
									className={cn({ 'bg-color-select-card-bg': linkedEntities.reminderIds.includes(reminder.id) })}
									key={reminder.id}
									title={reminder.title}
									isCompleted={reminder.completedAt !== null}
									onClick={() => handleSelectEntity('reminder')(reminder.id)}
									targetDateTime={reminder.targetDateTime}
								/>
							))}
						</div>
					</CollapsibleContent>
				</Collapsible>
				<div className="mt-4"></div>

				<div className="sticky bottom-0 flex w-full flex-col gap-8 bg-color-bg-95 pb-8 pt-4">
					<Button
						className="justify-seld-end sticky bottom-8 mt-auto"
						appearance="primary"
						onClick={handleApplyEntities}
					>
						Прикрепить
					</Button>
				</div>
			</div>
		</Sidebar>
	);
};
