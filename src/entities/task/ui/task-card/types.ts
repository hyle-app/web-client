import { TimeUnit } from '&shared/services/time';
import type { Subtask } from '../../model';

export type Props = {
	title: string;
	isCompleted?: boolean;
	targetDate?: number;
	overdueDetails?: {
		unit: TimeUnit;
		value: number;
	} | null;
	relatedGoalName?: string;
	subtasks?: Subtask[];
} & React.HTMLAttributes<HTMLButtonElement>;
