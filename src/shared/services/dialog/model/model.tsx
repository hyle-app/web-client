import { createEvent, createStore, sample } from 'effector';
import { not } from 'patronum';
import { Dialog, DialogId, DialogInstance } from './types';
import { generateTemporaryId } from '&shared/utils';

const $dialogs = createStore<Record<DialogId, DialogInstance>>({});

const createDialog = (opts: Dialog) => {
	const close = createEvent();
	const confirm = createEvent();
	const open = createEvent();
	const id = generateTemporaryId();
	const $isOpen = $dialogs.map((dialogs) => id in dialogs);

	sample({
		clock: open,
		source: $dialogs,
		filter: not($isOpen),
		fn: (dialogs) => {
			return {
				...dialogs,
				[id]: { params: opts, close, open, confirm }
			};
		},
		target: $dialogs
	});

	sample({
		clock: [close, confirm],
		source: $dialogs,
		filter: $isOpen,
		fn: (dialogs) => {
			const { [id]: _, ...rest } = dialogs;
			return rest;
		},
		target: $dialogs
	});

	if (opts.onConfirm) {
		sample({
			clock: confirm,
			target: opts.onConfirm
		});
	}

	if (opts.onClose) {
		sample({
			clock: close,
			target: opts.onClose
		});
	}

	return {
		close,
		open,
		confirm,
		$isOpen
	};
};

export const outputs = { createDialog };
export const internals = { $dialogs };
