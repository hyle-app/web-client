import { useUnit } from 'effector-react';
import { internals } from '../../model';
import { cn, dispatchEvent } from '&shared/utils';
import { Dialog } from '../dialog';

export const DialogContainer = () => {
	const { dialogs } = useUnit({
		dialogs: internals.$dialogs
	});

	const isBackdropVisible = Object.keys(dialogs).length > 0;
	const dialogsList = Object.values(dialogs);
	const lastDialog = dialogsList.at(-1);

	if (!lastDialog) {
		return null;
	}

	return (
		<div
			className={cn('fixed top-0 left-0 right-0 bottom-0 bg-color-overlay-bg duration-150 z-dialog-container', {
				'opacity-1 touch-all': isBackdropVisible,
				'touch-none opacity-0': !isBackdropVisible
			})}
			onClick={() => dispatchEvent(lastDialog.close)}
		>
			<div className="w-full h-full flex justify-center items-center">
				<Dialog
					title={lastDialog.params.title}
					body={lastDialog.params.body}
					actions={lastDialog.params.actions}
					onConfirm={() => dispatchEvent(lastDialog.confirm)}
					onClose={() => dispatchEvent(lastDialog.close)}
				/>
			</div>
		</div>
	);
};
