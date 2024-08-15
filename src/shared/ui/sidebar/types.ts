import React from 'react';

export type Props = {
	isOpen: boolean;
	onClose(): void;
	closeOnOverlayClick?: boolean;
} & React.HTMLAttributes<HTMLDivElement>;

export type CloseButtonProps = {
	onClick(): void;
} & React.HTMLAttributes<HTMLButtonElement>;
