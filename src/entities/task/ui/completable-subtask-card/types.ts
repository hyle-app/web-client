export type Props = {
	isCompleted: boolean;
	onCompletionToggle?: () => void;
} & React.HTMLAttributes<HTMLButtonElement>;
