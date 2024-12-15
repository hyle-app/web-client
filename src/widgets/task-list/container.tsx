import { taskEntity, TaskCard } from '&entities/task';
import { timeService } from '&shared/services/time';
import { Button } from '&shared/ui/button';
import { Icon } from '&shared/ui/icon';
import { Typography } from '&shared/ui/typography';
import { useUnit } from 'effector-react';
import { Props } from './types';
import { cn } from '&shared/utils';
import React from 'react';
import { goalEntity } from '&entities/goal';
import { CreateTaskFormSidebar } from '&features/create-task';
import { EditTaskFormSidebar } from '&features/edit-task';
import { inputs } from './model';

export function TaskListWidget({ className, ...attributes }: Props) {
	const [isCreateFormVisible, setIsCreateFormVisible] = React.useState(false);
	const [selectedTaskId, setSelectedTaskId] = React.useState<string | null>(null);

	const { tasks, selectedAppDateStart, realTimestamp, toggleTask, toggleSubtask } = useUnit({
		tasks: taskEntity.outputs.$currentAppDateTasks,
		selectedAppDateStart: timeService.outputs.$currentAppDateStart,
		realTimestamp: timeService.outputs.$realTimestamp,
		goals: goalEntity.outputs.$goals,
		toggleSubtask: inputs.toggleSubtask,
		toggleTask: inputs.toggleTask
	});

	const closeEditTaskForm = React.useCallback(() => {
		setSelectedTaskId(null);
	}, []);

	const closeCreateTaskForm = React.useCallback(() => {
		setIsCreateFormVisible(false);
	}, []);

	return (
		<section className={cn('overflow-y-scroll no-scrollbar pb-6', className)} {...attributes}>
			<div className="px-4 py-6 rounded-2xl border-1 border border-color-gray-10 min-h-full">
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-2">
						<Icon name="flag" className="text-color-warning w-6 h-6" />
						<Typography variant="heading-4" className="font-semibold">
							Задачи
						</Typography>
					</div>
					<Button variant="icon" appearance="primary" className="w-8 h-8" onClick={() => setIsCreateFormVisible(true)}>
						<Icon name="plus" className="w-4 h-4 text-color-white" />
					</Button>
				</div>
				<div className="flex flex-col gap-4 mt-6">
					{tasks.map((task) => {
						return (
							<TaskCard
								key={task.id}
								title={task.title}
								isCompleted={task.completedAt !== null}
								subtasks={task.subtasks}
								targetDate={taskEntity.lib.getTaskTargetDate(task, selectedAppDateStart)}
								overdueDetails={taskEntity.lib.getOverdueDetails(task, realTimestamp)}
								onClick={() => setSelectedTaskId(task.id)}
								onCompletionToggle={() => {
									toggleTask(task.id);
								}}
								onSubtaskCompletionToggle={(subtaskId) => {
									toggleSubtask({ taskId: task.id, subtaskId });
								}}
							/>
						);
					})}
				</div>
			</div>

			<CreateTaskFormSidebar isOpen={isCreateFormVisible} onClose={closeCreateTaskForm} />
			{selectedTaskId !== null && (
				<EditTaskFormSidebar isOpen={selectedTaskId !== null} onClose={closeEditTaskForm} taskId={selectedTaskId!} />
			)}
		</section>
	);
}
