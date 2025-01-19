import { HabitId } from '&entities/habit';
import { ReminderId } from '&entities/reminder';
import { TaskId } from '&entities/task';

type LinkedEntities = {
	reminderIds: ReminderId[];
	taskIds: TaskId[];
	habitIds: HabitId[];
};

export type Props = {
	onApplyEntities(entities: LinkedEntities): void;
	value: LinkedEntities;
	className?: string;
	onClose(): void;
	isOpen: boolean;
};
