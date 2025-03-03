export type Props = {
	title: React.ReactNode;
	emoji?: string | null;
	overallProgress: {
		current: number;
		target: number;
	};
	dailyProgress?: {
		current: number;
		target: number;
		label?: string;
	} | null;
	relatedGoalName?: string | null;
} & Omit<React.HTMLAttributes<HTMLButtonElement>, 'title'>;
