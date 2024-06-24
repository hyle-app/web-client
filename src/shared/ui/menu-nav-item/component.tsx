import { cn } from '&shared/utils';
import type { Props } from './types';

export function MenuNavItem({ title, iconSlot, isActive, className, ...props }: Props) {
	return (
		<button {...props} className={cn('flex items-center relative gap-4 @[185px]:w-full w-14', className)}>
			<div
				className={cn('h-14 rounded-2xl w-14 bg-color-bg-95 absolute left-0 top-0 bottom-0 transition-all', {
					'w-14': !isActive,
					'w-full': isActive
				})}
			></div>
			<div
				className={cn('h-14 w-14 flex items-center justify-center relative transition-color', {
					'text-color-brand-primary-50': isActive
				})}
			>
				{iconSlot}
			</div>
			<p
				className={cn('relative transition-colors @[185px]:flex hidden', {
					'text-color-brand-primary-50': isActive
				})}
			>
				{title}
			</p>
		</button>
	);
}
