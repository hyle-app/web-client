import { taskEntity, TaskCard } from '&entities/task';
import { timeService } from '&shared/services/time';
import { Button } from '&shared/ui/button';
import { Icon } from '&shared/ui/icon';
import { Typography } from '&shared/ui/typography';
import { useUnit } from 'effector-react';
import { Props } from './types';
import { cn } from '&shared/utils';

export function TaskListWidget({ className, ...attributes }: Props) {
	const { tasks, selectedAppDateStart, realTimestamp } = useUnit({
		tasks: taskEntity.outputs.$currentAppDateTasks,
		selectedAppDateStart: timeService.outputs.$currentAppDateStart,
		realTimestamp: timeService.outputs.$realTimestamp
	});

	return (
		<section className={cn('overflow-y-scroll no-scrollbar pb-6', className)} {...attributes}>
			<div className="px-4 py-6 rounded-2xl border-1 border border-color-gray-10 min-h-full">
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-2">
						<Icon name="refresh" className="text-color-warning w-6 h-6" />
						<Typography variant="heading-4" className="font-semibold">
							Задачи
						</Typography>
					</div>
					<Button variant="icon" appearance="primary" className="w-8 h-8">
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
							/>
						);
					})}
				</div>
			</div>
		</section>
	);
}
