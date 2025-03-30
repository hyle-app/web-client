export type Props = {
	withCalendarShortcuts?: boolean;
	disabled?: boolean;
	onDecomposeClick(): void;
	linkedEntitiesPreviewImpl: React.ReactNode;
	interactive?: boolean;
};
