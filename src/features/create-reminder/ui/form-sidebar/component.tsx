import { useUnit } from 'effector-react';
import { Props } from './types';
import { goalEntity } from '&entities/goal';
import { Sidebar } from '&shared/ui/sidebar';
import { Button } from '&shared/ui/button';
import { ReminderForm } from '&entities/reminder';

export function CreateReminderFormSidebar({ isOpen, onClose }: Props) {
	const { goals } = useUnit({
		goals: goalEntity.outputs.$goals
	});

	const handleSubmit = () => {};

	return (
		<Sidebar isOpen={isOpen} onClose={onClose}>
			<div className="flex flex-col justify-between pb-8 h-full">
				<ReminderForm goalsToLinkTo={goals} />
				<Button variant="button" appearance="primary" onClick={handleSubmit} className="mx-8 self-stretch ">
					Создать напоминание
				</Button>
			</div>
		</Sidebar>
	);
}
