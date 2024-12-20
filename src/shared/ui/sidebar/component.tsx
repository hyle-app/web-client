import { cn } from '&shared/utils';
import React from 'react';
import { CloseButtonProps, Props } from './types';
import { Icon } from '../icon';

const SIDEBAR_ANIMATION_DURATION = 300;
const BACKDROP_ANIMATION_DURATION = 100;

export function Sidebar({ children, isOpen, onClose, closeOnOverlayClick = true }: React.PropsWithChildren<Props>) {
	const [isComponentMounted, setIsComponentMounted] = React.useState(false);
	const [isSidebarVisible, setIsSidebarVisible] = React.useState(false);
	const [isBackdropVisible, setIsBackdropVisible] = React.useState(false);
	React.useLayoutEffect(() => {
		if (isOpen) {
			setIsComponentMounted(true);
			const backdropAnimationTimeoutId = setTimeout(setIsBackdropVisible, 0, true);
			const sidebarAnimationTimeoutId = setTimeout(setIsSidebarVisible, BACKDROP_ANIMATION_DURATION, true);

			return () => {
				clearTimeout(backdropAnimationTimeoutId);
				clearTimeout(sidebarAnimationTimeoutId);
			};
		}

		setIsSidebarVisible(false);
		const backdropAnimationTimeoutId = setTimeout(setIsBackdropVisible, SIDEBAR_ANIMATION_DURATION, false);
		const sidebarAnimationTimeoutId = setTimeout(
			setIsComponentMounted,
			BACKDROP_ANIMATION_DURATION + SIDEBAR_ANIMATION_DURATION,
			false
		);

		return () => {
			clearTimeout(backdropAnimationTimeoutId);
			clearTimeout(sidebarAnimationTimeoutId);
		};
	}, [isOpen]);

	return (
		<div
			className={cn('fixed top-0 left-0 right-0 bottom-0 z-50', {
				'block touch-all': isComponentMounted,
				'hidden touch-none': !isComponentMounted
			})}
		>
			<div
				className={cn('absolute top-0 left-0 right-0 bottom-0 bg-color-overlay-bg duration-150', {
					'opacity-1 touch-all': isBackdropVisible,
					'touch-none opacity-0': !isBackdropVisible
				})}
				onClick={closeOnOverlayClick ? onClose : undefined}
			></div>
			<div
				className={cn(
					'absolute right-0 top-0 bottom-0 w-[590px] max-w-full transition-transform bg-color-bg-95 duration-300',
					{
						'translate-x-full': !isSidebarVisible,
						'translate-x-0': isSidebarVisible
					}
				)}
			>
				<CloseButton className={'absolute right-0 top-4'} onClick={onClose} />
				{children}
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
