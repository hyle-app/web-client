import { TimeUnit } from '&shared/services/time';
import type { Subtask, SubtaskId } from '../../model';

export type Props = {
	title: string;
	isCompleted?: boolean;
	targetDate?: number;
	overdueDetails?: {
		unit: TimeUnit;
		value: number;
	} | null;
	relatedGoalName?: string | null;
	subtasks?: Subtask[];
	onSubtaskCompletionToggle?(subtaskId: SubtaskId): void;
	onCompletionToggle?(): void;
} & React.HTMLAttributes<HTMLButtonElement>;
