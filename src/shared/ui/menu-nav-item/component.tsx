import { cn } from '&shared/utils';
import type { Props } from './types';

export function MenuNavItem({ title, iconSlot, isActive, className, ...props }: Props) {
	return (
		<button {...props} className={cn('relative flex w-14 items-center gap-4 @[185px]:w-full', className)}>
			<div
				className={cn('absolute bottom-0 left-0 top-0 h-14 w-14 rounded-2xl bg-color-bg-95 transition-all', {
					'w-14': !isActive,
					'w-full': isActive
				})}
			></div>
			<div
				className={cn('transition-color relative flex h-14 w-14 items-center justify-center', {
					'text-color-brand-primary-50': isActive,
					'text-color-text-and-icon-80': !isActive
				})}
			>
				{iconSlot}
			</div>
			<p
				className={cn('relative hidden transition-colors @[185px]:flex', {
					'text-color-brand-primary-50': isActive,
					'text-color-text-and-icon-80': !isActive
				})}
			>
				{title}
			</p>
		</button>
	);
}
