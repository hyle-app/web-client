export type GoalToLinkTo = {
	id: string;
	title: string;
	emoji: string | null;
};

export type Props = {
	goalsToLinkTo: GoalToLinkTo[];
	withCalendarShortcuts?: boolean;
	autofocus?: boolean;
};
