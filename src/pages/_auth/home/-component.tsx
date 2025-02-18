import { HabitListWidget } from '&widgets/habit-list';
import { ReminderListWidget } from '&widgets/reminder-list';
import { TaskListWidget } from '&widgets/task-list';

export function HomePage() {
	return (
		<>
			<div className="h-full w-0 grow">
				<div className="no-scrollbar grid h-full w-full grid-cols-1 gap-3 overflow-x-scroll px-8 sm:grid-cols-[repeat(auto-fit,minmax(375px,1fr))] md:grid-cols-[repeat(3,minmax(420px,1fr))]">
					<HabitListWidget className="h-full max-h-[calc(100vh-104px)]" />
					<TaskListWidget className="h-full max-h-[calc(100vh-104px)]" />
					<ReminderListWidget className="h-full max-h-[calc(100vh-104px)]" />
				</div>
			</div>
		</>
	);
}
