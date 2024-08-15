import { TimeUnit } from '&shared/services/time';

export type Props = {
	title: string;
	emoji?: string | null;
	progress: {
		current: number;
		target: number;
		label?: string;
	};
	timeLeft?: {
		value: number;
		unit: TimeUnit;
	};
	overdueDetails?: {
		value: number;
		unit: TimeUnit;
	} | null;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;
