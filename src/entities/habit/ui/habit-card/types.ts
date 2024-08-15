export type Props = {
	title: string;
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
	relatedGoalName?: string;
} & React.HTMLAttributes<HTMLButtonElement>;
