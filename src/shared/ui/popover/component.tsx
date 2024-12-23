import * as PopoverPrimitives from '@radix-ui/react-popover';
import { Props } from './types';
import { cn } from '&shared/utils';

export const Popover = ({ children, content, isOpen, onClose, contentClassName, portalContainerRef }: Props) => (
	<PopoverPrimitives.Root open={isOpen}>
		<PopoverPrimitives.Trigger asChild>
			<div>{children}</div>
		</PopoverPrimitives.Trigger>
		<PopoverPrimitives.Portal container={portalContainerRef?.current}>
			<PopoverPrimitives.Content
				onFocusOutside={(event) => {
					if (!portalContainerRef?.current) {
						onClose?.();
						return;
					}

					if (!portalContainerRef.current.contains(event.target as Node)) {
						onClose?.();
					}
				}}
				className={cn('z-select-dropdown bg-color-bg-100 rounded-2xl', contentClassName)}
			>
				<PopoverPrimitives.Arrow asChild>
					<div className="border-t-color-bg-100 border-b-0 border-r-[10px] border-l-[10px] border-t-[10px] border-r-transparent border-l-transparent w-0 h-0 mb-2"></div>
				</PopoverPrimitives.Arrow>

				{content}
			</PopoverPrimitives.Content>
		</PopoverPrimitives.Portal>
	</PopoverPrimitives.Root>
);
