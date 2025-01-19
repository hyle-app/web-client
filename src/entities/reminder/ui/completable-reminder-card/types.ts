import { TimeUnit } from '&shared/services/time';

export type Props = {
	className?: string;
	title: string;
	isCompleted?: boolean;
	relatedGoalName?: string;
	overdueDetails?: {
		unit: TimeUnit;
		value: number;
	} | null;
	targetDateTime: number;
	onToggleCompletion?(): void;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;
