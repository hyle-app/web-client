import { timeService } from '&shared/services/time';
import { Task } from './types';

export function getMockTasks(amount: number = 7): Task[] {
	return Array.from(Array(amount), (_, index: number) => ({
		id: index.toString(),
		description: 'This is a description',
		createdAt: timeService.lib.getCurrentTimestamp(),
		title: `Task ${index}`,
		targetCompletionDateRange: [timeService.lib.getCurrentTimestamp() - timeService.lib.DAY * 2, null],
		completedAt: null,
		linkedGoalId: null,
		remindAt: null,
		subtasks: Array.from(Array(Math.random() < 0.5 ? 3 : 0), (_, subIndex: number) => ({
			id: subIndex.toString(),
			title: `Subtask ${subIndex}`,
			isCompleted: subIndex % 2 === 0
		}))
	}));
}
