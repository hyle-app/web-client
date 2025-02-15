import { EventCallable } from 'effector';

export type DialogId = string;
export type Dialog = {
	title?: React.ReactNode;
	body?: React.ReactNode;
	actions: (params: { onClose: () => void; onConfirm: () => void }) => React.ReactNode[];
	onConfirm?: EventCallable<void>;
	onClose?: EventCallable<void>;
};

export type DialogInstance = {
	params: Dialog;
	close: EventCallable<void>;
	open: EventCallable<void>;
	confirm: EventCallable<void>;
};
