import { HabitId } from '&entities/habit';
import { ReminderId } from '&entities/reminder';
import { TaskId } from '&entities/task';

export type LinkedEntities = {
	reminderIds: ReminderId[];
	taskIds: TaskId[];
	habitIds: HabitId[];
};

export type Props = {
	className?: string;
	linkedEntities: LinkedEntities;
	onEditClick(): void;
};
