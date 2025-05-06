export type Props = {
	children: React.ReactNode;
	content: React.ReactNode;
	isOpen: boolean;
	onClose(): void;
	className?: string;
	contentClassName?: string;
	portalContainerRef?: React.RefObject<HTMLElement>;
	autoFocusContent?: boolean;
};
