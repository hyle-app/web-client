export type Props = {
	children: React.ReactNode;
	content: React.ReactNode;
	isOpen: boolean;
	onClose(): void;
	contentClassName?: string;
	portalContainerRef?: React.RefObject<HTMLElement>;
};
