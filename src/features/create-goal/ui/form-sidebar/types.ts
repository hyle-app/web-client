import { HabitId } from '&entities/habit';
import { ReminderId } from '&entities/reminder';
import { TaskId } from '&entities/task';

export type LinkedEntities = {
	linkedReminderIds: ReminderId[];
	linkedTasksIds: TaskId[];
	linkedHabitIds: HabitId[];
};

export type DecomposeImplementationProps = {
	onApplyEntities(entities: LinkedEntities): void;
	onClose(): void;
	isOpen: boolean;
};

export type Props = {
	isOpen: boolean;
	onClose: () => void;
	DecomposeImplementation: React.FC<DecomposeImplementationProps>;
};
