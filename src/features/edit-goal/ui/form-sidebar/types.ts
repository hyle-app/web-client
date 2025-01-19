import { GoalId } from '&entities/goal/model/types';
import { HabitId } from '&entities/habit';
import { ReminderId } from '&entities/reminder';
import { TaskId } from '&entities/task';

export type LinkedEntities = {
	reminderIds: ReminderId[];
	taskIds: TaskId[];
	habitIds: HabitId[];
};

export type DecomposeImplementationProps = {
	className?: string;
	onApplyEntities(entities: LinkedEntities): void;
	value: LinkedEntities;
	onClose(): void;
	isOpen: boolean;
};

export type DecomposePreviewImplementationProps = {
	className?: string;
	linkedEntities: LinkedEntities;
	onEditClick(): void;
};

export type Props = {
	isOpen: boolean;
	onClose: () => void;
	goalId: GoalId;
	disabled?: boolean;
	onFillComplexGoalProgress?: (delta: number) => void;
	onCompleteSimpleGoal?: () => void;
	DecomposeImplementation: React.FC<DecomposeImplementationProps>;
	DecomposePreviewImplementation: React.FC<DecomposePreviewImplementationProps>;
};
