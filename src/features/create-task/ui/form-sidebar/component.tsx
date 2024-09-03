import { useUnit } from 'effector-react';
import { Props } from './types';
import { goalEntity } from '&entities/goal';
import { Sidebar } from '&shared/ui/sidebar';
import { TaskForm } from '&entities/task/ui/task-form';
import { Button } from '&shared/ui/button';

export function CreateTaskFormSidebar({ isOpen, onClose }: Props) {
	const { goals } = useUnit({
		goals: goalEntity.outputs.$goals
	});

	const handleSubmit = () => {};

	return (
		<Sidebar isOpen={isOpen} onClose={onClose}>
			<div className="flex flex-col justify-between pb-8 h-full">
				<TaskForm goalsToLinkTo={goals} />
				<Button variant="button" appearance="primary" onClick={handleSubmit} className="mx-8 self-stretch ">
					Создать задачу
				</Button>
			</div>
		</Sidebar>
	);
}
