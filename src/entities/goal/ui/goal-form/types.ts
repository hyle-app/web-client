export type Props = {
	withCalendarShortcuts?: boolean;
	disabled?: boolean | undefined;
	onDecomposeClick(): void;
	linkedEntitiesPreviewImpl: React.ReactNode;
	interactive?: boolean | undefined;
};
