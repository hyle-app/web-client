import { dialogService } from '&shared/services/dialog';
import { createEvent } from 'effector';
import { Button } from '../button';

const confirmDialogConfirmed = createEvent();
const confrimDialogClosed = createEvent();

const {
	open: openConfirmDialog,
	close: closeConfirmDialog,
	confirm: confirmConfirmDialog
} = dialogService.outputs.createDialog({
	title: 'Ты уверен, что хочешь закрыть это окно?',
	body: 'Все несохраненные данные будут потеряны.',
	actions: ({ onConfirm, onClose }) => [
		<Button appearance="secondary" onClick={onClose}>
			Отменить
		</Button>,
		<Button appearance="primary" className="bg-color-brand-primary-50" onClick={onConfirm}>
			Да, закрыть
		</Button>
	],
	onConfirm: confirmDialogConfirmed
});

export const internals = {
	openConfirmDialog,
	closeConfirmDialog,
	confirmConfirmDialog,
	confirmDialogConfirmed,
	confrimDialogClosed
};
