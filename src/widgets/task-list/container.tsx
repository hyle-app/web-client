import { taskEntity, CompletableTaskCard } from '&entities/task';
import { timeService } from '&shared/services/time';
import { Button } from '&shared/ui/button';
import { Icon } from '&shared/ui/icon';
import { useUnit } from 'effector-react';
import { Props } from './types';
import React from 'react';
import { goalEntity } from '&entities/goal';
import { CreateTaskFormSidebar } from '&features/create-task';
import { EditTaskFormSidebar } from '&features/edit-task';
import { toggleTaskCompletionFeature } from '&features/toggle-task-completion';
import { inputs, outputs } from './model';
import { EntityColumn } from '&shared/ui/entity-column';

export function TaskListWidget({ className, ...attributes }: Props) {
	const [isCreateFormVisible, setIsCreateFormVisible] = React.useState(false);

	const {
		tasks,
		selectedAppDateStart,
		realTimestamp,
		toggleTask,
		toggleSubtask,
		setSelectedTaskId,
		selectedTaskId,

		getGoalOrAchievementById,
		resetSelectedTaskId
	} = useUnit({
		tasks: taskEntity.outputs.$currentAppDateTasks,
		selectedAppDateStart: timeService.outputs.$currentAppDateStart,
		realTimestamp: timeService.outputs.$realTimestamp,
		goals: goalEntity.outputs.$goals,
		toggleSubtask: toggleTaskCompletionFeature.inputs.toggleSubtask,
		toggleTask: toggleTaskCompletionFeature.inputs.toggleTask,
		setSelectedTaskId: inputs.setSelectedTaskId,
		selectedTaskId: outputs.$selectedTaskId,
		resetSelectedTaskId: inputs.resetSelectedTaskId,
		getGoalOrAchievementById: goalEntity.outputs.$getGoalOrAchievementById
	});

	const closeEditTaskForm = React.useCallback(() => {
		resetSelectedTaskId();
	}, []);

	const closeCreateTaskForm = React.useCallback(() => {
		setIsCreateFormVisible(false);
	}, []);

	return (
		<EntityColumn
			titleSlot="Задачи"
			iconSlot={<Icon name="flag" className="h-6 w-6 text-color-warning" />}
			createButtonSlot={
				<Button variant="icon" appearance="primary" className="h-8 w-8" onClick={() => setIsCreateFormVisible(true)}>
					<Icon name="plus" className="h-4 w-4 text-color-white" />
				</Button>
			}
			cardsSlot={tasks.map((task) => {
				return (
					<CompletableTaskCard
						key={task.id}
						title={task.title}
						isCompleted={task.completedAt !== null}
						subtasks={task.subtasks}
						targetDate={taskEntity.lib.getTaskTargetDate(task, selectedAppDateStart)}
						overdueDetails={taskEntity.lib.getOverdueDetails(task, realTimestamp)}
						relatedGoalName={getGoalOrAchievementById(task.linkedGoalId)?.title ?? null}
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
			className={className}
			footerSlot={
				<>
					<CreateTaskFormSidebar isOpen={isCreateFormVisible} onClose={closeCreateTaskForm} />
					{selectedTaskId !== null && (
						<EditTaskFormSidebar
							isOpen={selectedTaskId !== null}
							onClose={closeEditTaskForm}
							taskId={selectedTaskId!}
						/>
					)}
				</>
			}
			{...attributes}
		/>
	);
}
