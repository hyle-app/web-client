import { cn } from '&shared/utils';
import { ChildCardProps, ChildrenIndentProps } from './types';

export function EntityChildCard({ leftSlot, titleSlot, className, ...attributes }: ChildCardProps) {
	return (
		<button
			className={cn('flex gap-4 py-2 px-4 h-10 bg-color-bg-100 w-full rounded-[13px] items-center', className)}
			{...attributes}
		>
			{leftSlot}
			{titleSlot}
		</button>
	);
}

export function EntityChildredIndent({ children, className, ...attributes }: ChildrenIndentProps) {
	return (
		<section className={cn('flex flex-col gap-2', className)} {...attributes}>
			{children.map((child, index, { length: childrenTotalAmount }) => (
				<article key={index} className="flex gap-4 relative">
					<div className="w-[15px] h-[1px] bg-color-gray-30 self-center"></div>
					<div
						className={cn('w-[1px] left-0 absolute -top-1 bg-color-gray-30', {
							'h-[calc(50%+4px)]': index === childrenTotalAmount - 1,
							'h-[calc(100%+8px)] ': index !== childrenTotalAmount - 1
						})}
					></div>
					{child}
				</article>
			))}
		</section>
	);
}
