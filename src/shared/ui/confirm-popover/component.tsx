import { cn } from '&shared/utils';
import { Button } from '../button';
import { Popover } from '../popover';
import { Typography } from '../typography';
import { Props } from './types';

export function ConfirmPopover({
	isOpen,
	onClose,
	onConfirm,
	confirmButtonAppearance = 'primary',
	children,
	contentClassName,
	confirmationText,
	portalContainerRef
}: Props) {
	return (
		<Popover
			content={
				<div className="flex content-center flex-col p-4 gap-4">
					<Typography variant="paragraph" className="text-color-text-and-icon-80 text-center">
						{confirmationText}
					</Typography>
					<div className="flex gap-2">
						<Button variant="narrow-button" appearance="ghost" className="w-1/2" onClick={onClose}>
							<Typography variant="caption-1">Отмена</Typography>
						</Button>
						<Button variant="narrow-button" appearance={confirmButtonAppearance} className="w-1/2" onClick={onConfirm}>
							<Typography variant="caption-1">Да, подтвердить</Typography>
						</Button>
					</div>
				</div>
			}
			contentClassName={cn('min-w-[325px]', contentClassName)}
			isOpen={isOpen}
			onClose={onClose}
			portalContainerRef={portalContainerRef}
		>
			{children}
		</Popover>
	);
}
