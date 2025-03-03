import { TimeUnit } from '&shared/services/time';
import type { Subtask } from '../../model';

export type Props = {
	title: React.ReactNode;
	isCompleted?: boolean;
	targetDate?: number;
	overdueDetails?: {
		unit: TimeUnit;
		value: number;
	} | null;
	relatedGoalName?: string;
	subtasks?: Subtask[];
} & Omit<React.HTMLAttributes<HTMLButtonElement>, 'title'>;
