import { Meta } from '@storybook/react/*';

import { TaskCard } from './component';

const meta: Meta<typeof TaskCard> = {
	component: TaskCard,
	title: 'entities/task/task-card'
};

export function Default() {
	return (
		<TaskCard
			title="Task title"
			isCompleted={false}
			targetDate={new Date().getTime()}
			subtasks={[
				{ id: '1', title: 'Subtask 1', isCompleted: false },
				{ id: '2', title: 'Subtask 2', isCompleted: true }
			]}
			relatedGoalName="Goal name"
		/>
	);
}

export function Completed() {
	return (
		<TaskCard
			title="Task title"
			isCompleted={true}
			targetDate={new Date().getTime()}
			overdueDetails={{ unit: 'day', value: 2 }}
			subtasks={[
				{ id: '1', title: 'Subtask 1', isCompleted: true },
				{ id: '2', title: 'Subtask 2', isCompleted: true }
			]}
			relatedGoalName="Goal name"
		/>
	);
}

export default meta;
