import React from 'react';
import { Sidebar } from '&shared/ui/sidebar';
import { HabitListWidget } from '&widgets/habit-list';
import { ReminderListWidget } from '&widgets/reminder-list';
import { TaskListWidget } from '&widgets/task-list';
import { TaskForm } from '&entities/task/ui/task-form/component';

export function HomePage() {
	const [isOpen, setIsOpen] = React.useState(false);

	return (
		<>
			<div className="w-0 grow h-full" onClick={() => setIsOpen(true)}>
				<div className="grid md:grid-cols-[repeat(3,minmax(420px,1fr))] grid-cols-[repeat(auto-fit,minmax(375px,1fr))] gap-3 w-full overflow-x-scroll px-8 no-scrollbar">
					<HabitListWidget className="h-full max-h-[calc(100vh-104px)] " />
					<TaskListWidget className="h-full max-h-[calc(100vh-104px)]" />
					<ReminderListWidget className="h-full max-h-[calc(100vh-104px)]" />
				</div>
			</div>

			<Sidebar isOpen={isOpen} onClose={() => setIsOpen(false)}>
				<TaskForm />
			</Sidebar>
		</>
	);
}
