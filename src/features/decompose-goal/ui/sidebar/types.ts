import { HabitId } from '&entities/habit';
import { ReminderId } from '&entities/reminder';
import { TaskId } from '&entities/task';

type LinkedEntities = {
	linkedReminderIds: ReminderId[];
	linkedTasksIds: TaskId[];
	linkedHabitIds: HabitId[];
};

export type Props = {
	onApplyEntities(entities: LinkedEntities): void;
	onClose(): void;
	isOpen: boolean;
};
