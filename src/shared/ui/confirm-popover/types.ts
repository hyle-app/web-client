import { Appearance } from '../button';

export type Props = {
	children: React.ReactNode;
	confirmButtonAppearance?: Appearance;
	isOpen: boolean;
	onClose(): void;
	onConfirm(): void;
	contentClassName?: string;
	portalContainerRef?: React.RefObject<HTMLElement>;
	confirmationText: React.ReactNode;
};
