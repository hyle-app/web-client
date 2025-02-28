import * as PopoverPrimitives from '@radix-ui/react-popover';
import { Props } from './types';
import { cn } from '&shared/utils';

export const Popover = ({
	children,
	content,
	isOpen,
	onClose,
	contentClassName,
	portalContainerRef,
	autoFocusContent = true
}: Props) => {
	const handleFocusOutside = (event: CustomEvent<{ originalEvent: FocusEvent | PointerEvent }>) => {
		if (!portalContainerRef?.current) {
			onClose?.();
			return;
		}

		if (!portalContainerRef.current.contains(event.target as Node)) {
			onClose?.();
		}
	};
	return (
		<PopoverPrimitives.Root open={isOpen}>
			<PopoverPrimitives.Trigger asChild>
				<div>{children}</div>
			</PopoverPrimitives.Trigger>
			<PopoverPrimitives.Portal container={portalContainerRef?.current}>
				<PopoverPrimitives.Content
					onOpenAutoFocus={(e) => {
						if (!autoFocusContent) e.preventDefault();
					}}
					onInteractOutside={handleFocusOutside}
					onPointerDownOutside={handleFocusOutside}
					onFocusOutside={handleFocusOutside}
					className={cn('z-select-dropdown rounded-2xl bg-color-bg-100', contentClassName)}
				>
					<PopoverPrimitives.Arrow asChild>
						<div className="mb-2 h-0 w-0 border-b-0 border-l-[10px] border-r-[10px] border-t-[10px] border-l-transparent border-r-transparent border-t-color-bg-100"></div>
					</PopoverPrimitives.Arrow>

					{content}
				</PopoverPrimitives.Content>
			</PopoverPrimitives.Portal>
		</PopoverPrimitives.Root>
	);
};
