import { cn, useEventEffect } from '&shared/utils';
import React from 'react';
import { ActionButtonProps, ActionProps, Props } from './types';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuPortal,
	DropdownMenuTrigger
} from '../dropdown-menu';
import { useUnit } from 'effector-react';
import { internals } from './model';

const SIDEBAR_ANIMATION_DURATION = 300;
const BACKDROP_ANIMATION_DURATION = 100;

export function Sidebar({
	children,
	isOpen,
	onClose,
	onCloseActionMenu,
	closeOnOverlayClick = true,
	confirmOverlayClose,
	actions,
	actionMenuContentRef,
	foreheadSlot,
	className
}: React.PropsWithChildren<Props>) {
	const [isActionsMenuOpen, setIsActionMenuOpen] = React.useState(false);
	const [isSidebarVisible, setIsSidebarVisible] = React.useState(false);
	const [isBackdropVisible, setIsBackdropVisible] = React.useState(false);
	const { openConfirmDialog } = useUnit({
		openConfirmDialog: internals.openConfirmDialog
	});

	useEventEffect(internals.confirmDialogConfirmed, () => {
		handleClose();
	});

	const handleClose = React.useCallback(() => {
		setIsSidebarVisible(false);
		setIsBackdropVisible(false);
		setTimeout(() => {
			onClose();
		}, SIDEBAR_ANIMATION_DURATION);
	}, [onClose]);

	React.useLayoutEffect(() => {
		if (isOpen) {
			const backdropAnimationTimeoutId = setTimeout(setIsBackdropVisible, 0, true);
			const sidebarAnimationTimeoutId = setTimeout(setIsSidebarVisible, BACKDROP_ANIMATION_DURATION, true);

			return () => {
				clearTimeout(backdropAnimationTimeoutId);
				clearTimeout(sidebarAnimationTimeoutId);
			};
		}

		return () => {};
	}, [isOpen]);

	const handleBackdropClick = () => {
		if (confirmOverlayClose) {
			openConfirmDialog();
			return;
		}
		handleClose();
	};

	const handleCloseActionMenu = () => {
		setIsActionMenuOpen(false);
		onCloseActionMenu?.();
	};

	const handleOpenActionMenu = () => {
		setIsActionMenuOpen(true);
	};

	return (
		<div
			className={cn('fixed bottom-0 left-0 right-0 top-0 z-sidebar', {
				'touch-all block': isOpen,
				'hidden touch-none': !isOpen
			})}
		>
			<div
				className={cn('absolute bottom-0 left-0 right-0 top-0 z-10 bg-color-overlay-bg duration-150', {
					'opacity-1 touch-all': isBackdropVisible,
					'touch-none opacity-0': !isBackdropVisible
				})}
				onClick={() => closeOnOverlayClick && handleBackdropClick()}
			></div>
			<div
				className={cn(
					'absolute bottom-0 right-0 top-0 z-20 w-[590px] max-w-full bg-color-bg-95 transition-transform duration-300',
					className,
					{
						'translate-x-full': !isSidebarVisible,
						'translate-x-0': isSidebarVisible
					}
				)}
			>
				{((actions && actions.length > 0) || Boolean(foreheadSlot)) && (
					<div className="border-b-solid flex items-center justify-between border-b-[1px] border-b-color-gray-10 py-[6px] pl-8 pr-4">
						{foreheadSlot || <div></div>}
						<div className="flex items-center gap-2">
							{actions && actions.length > 0 && (
								<DropdownMenu defaultOpen open={isActionsMenuOpen}>
									<DropdownMenuTrigger asChild>
										<ActionButton onClick={handleOpenActionMenu} />
									</DropdownMenuTrigger>
									<DropdownMenuPortal>
										<DropdownMenuContent
											onInteractOutside={handleCloseActionMenu}
											className="z-select-dropdown min-w-[234px] rounded-2xl bg-color-bg-100"
											ref={actionMenuContentRef}
										>
											{actions.map((action, idx) => (
												<React.Fragment key={idx}>{action}</React.Fragment>
											))}
										</DropdownMenuContent>
									</DropdownMenuPortal>
								</DropdownMenu>
							)}
						</div>
					</div>
				)}
				<div className="no-scrollbar flex h-full flex-col overflow-y-auto">{children}</div>
			</div>
		</div>
	);
}

const ActionButton = React.forwardRef<HTMLButtonElement, ActionButtonProps>(({ className, ...attributes }, ref) => {
	return (
		<button className={cn('p-2', className)} {...attributes} ref={ref}>
			<div className="flex gap-0.5">
				{Array.from({ length: 3 }).map((_, index) => (
					<div key={index} className="h-1 w-1 rounded-full bg-color-text-and-icon-80"></div>
				))}
			</div>
		</button>
	);
});

function Action({ className, iconSlot, labelSlot, ...attributes }: ActionProps) {
	return (
		<DropdownMenuItem asChild>
			<button className={cn('flex w-full gap-2 bg-color-bg-100', className)} {...attributes}>
				{iconSlot}
				{labelSlot}
			</button>
		</DropdownMenuItem>
	);
}

Sidebar.Action = Action;
