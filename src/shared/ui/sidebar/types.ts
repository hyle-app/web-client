import React from 'react';

export type Props = {
	isOpen: boolean;
	onClose(): void;
	onCloseActionMenu?(): void;
	closeOnOverlayClick?: boolean;
	confirmOverlayClose?: boolean;
	actions?: React.ReactNode[];
	actionMenuContentRef?: React.RefObject<HTMLDivElement>;
} & React.HTMLAttributes<HTMLDivElement>;

export type CloseButtonProps = {
	onClick(): void;
} & React.HTMLAttributes<HTMLButtonElement>;

export type ActionButtonProps = {
	onClick(): void;
} & React.HTMLAttributes<HTMLButtonElement>;

export type ActionProps = {
	onClick?(): void;
	iconSlot: React.ReactNode;
	labelSlot: React.ReactNode;
} & Omit<React.HTMLAttributes<HTMLButtonElement>, 'children'>;
