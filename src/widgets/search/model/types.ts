import { Habit } from '&entities/habit';
import { Reminder } from '&entities/reminder';
import { Task } from 'src/entities/task';

export type SearchResults = {
	tasks: Task[];
	habits: Habit[];
	reminders: Reminder[];
};
