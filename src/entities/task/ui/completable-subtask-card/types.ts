export type Props = {
	isCompleted: boolean;
	onCompletionToggle: (() => void) | undefined;
} & React.HTMLAttributes<HTMLButtonElement>;
