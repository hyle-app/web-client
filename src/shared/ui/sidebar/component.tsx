import { cn } from '&shared/utils';
import React from 'react';
import { ActionButtonProps, ActionProps, CloseButtonProps, Props } from './types';
import { Icon } from '../icon';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuPortal,
	DropdownMenuTrigger
} from '../dropdown-menu';

const SIDEBAR_ANIMATION_DURATION = 300;
const BACKDROP_ANIMATION_DURATION = 100;

export function Sidebar({
	children,
	isOpen,
	onClose,
	onCloseActionMenu,
	closeOnOverlayClick = true,
	actions,
	actionMenuContentRef
}: React.PropsWithChildren<Props>) {
	const [isActionsMenuOpen, setIsActionMenuOpen] = React.useState(false);
	const [isSidebarVisible, setIsSidebarVisible] = React.useState(false);
	const [isBackdropVisible, setIsBackdropVisible] = React.useState(false);

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

	const handleCloseActionMenu = () => {
		setIsActionMenuOpen(false);
		onCloseActionMenu?.();
	};

	const handleOpenActionMenu = () => {
		setIsActionMenuOpen(true);
	};

	return (
		<div
			className={cn('fixed top-0 left-0 right-0 bottom-0 z-sidebar', {
				'block touch-all': isOpen,
				'hidden touch-none': !isOpen
			})}
		>
			<div
				className={cn('absolute top-0 left-0 right-0 bottom-0 bg-color-overlay-bg duration-150 z-10', {
					'opacity-1 touch-all': isBackdropVisible,
					'touch-none opacity-0': !isBackdropVisible
				})}
				onClick={() => closeOnOverlayClick && handleClose()}
			></div>
			<div
				className={cn(
					'absolute right-0 top-0 bottom-0 w-[590px] max-w-full transition-transform bg-color-bg-95 duration-300 z-20',
					{
						'translate-x-full': !isSidebarVisible,
						'translate-x-0': isSidebarVisible
					}
				)}
			>
				<div className="absolute right-0 top-4 flex gap-2 z-10">
					{actions && actions.length > 0 && (
						<DropdownMenu defaultOpen open={isActionsMenuOpen}>
							<DropdownMenuTrigger asChild>
								<ActionButton onClick={handleOpenActionMenu} />
							</DropdownMenuTrigger>
							<DropdownMenuPortal>
								<DropdownMenuContent
									onInteractOutside={handleCloseActionMenu}
									className="z-select-dropdown bg-color-bg-100 rounded-2xl min-w-[234px]"
									ref={actionMenuContentRef}
								>
									{actions.map((action, idx) => (
										<React.Fragment key={idx}>{action}</React.Fragment>
									))}
								</DropdownMenuContent>
							</DropdownMenuPortal>
						</DropdownMenu>
					)}
					<CloseButton onClick={handleClose} />
				</div>
				<div className="h-full overflow-y-auto flex flex-col">{children}</div>
			</div>
		</div>
	);
}

function CloseButton({ className, ...attributes }: CloseButtonProps) {
	return (
		<button className={cn('p-2', className)} {...attributes}>
			<Icon name="plus" className="text-color-text-and-icon-80 rotate-45 w-[32px] h-[32px]" />
		</button>
	);
}

const ActionButton = React.forwardRef<HTMLButtonElement, ActionButtonProps>(({ className, ...attributes }, ref) => {
	return (
		<button className={cn('p-2', className)} {...attributes} ref={ref}>
			<div className="flex gap-0.5">
				{Array.from({ length: 3 }).map((_, index) => (
					<div key={index} className="w-1 h-1 rounded-full bg-color-text-and-icon-80"></div>
				))}
			</div>
		</button>
	);
});

function Action({ className, iconSlot, labelSlot, ...attributes }: ActionProps) {
	return (
		<DropdownMenuItem asChild>
			<button className={cn('flex bg-color-bg-100 gap-2 w-full', className)} {...attributes}>
				{iconSlot}
				{labelSlot}
			</button>
		</DropdownMenuItem>
	);
}

Sidebar.Action = Action;
