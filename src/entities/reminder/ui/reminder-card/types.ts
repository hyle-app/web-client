import { TimeUnit } from '&shared/services/time';

export type Props = {
	className?: string;
	title: React.ReactNode;
	isCompleted?: boolean;
	relatedGoalName?: string;
	overdueDetails?: {
		unit: TimeUnit;
		value: number;
	} | null;
	targetDateTime: number;
	onToggleCompletion?(): void;
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'title'>;
