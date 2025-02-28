import { cn } from '&shared/utils';
import { Typography } from '../typography';
import { Props } from './types';

export const EntityColumn = ({
	titleSlot,
	iconSlot,
	footerSlot,
	cardsSlot,
	className,
	createButtonSlot,
	...attributes
}: Props) => {
	return (
		<section className={cn('no-scrollbar relative overflow-y-scroll pb-6', className)} {...attributes}>
			<div className="border-1 grow-1 min-h-full rounded-2xl border border-color-gray-10 px-4 pb-6">
				<div className="sticky top-0 z-[1] flex items-center justify-between bg-color-bg-95 py-6">
					<div className="flex items-center gap-2">
						{iconSlot}
						<Typography variant="heading-4" className="font-semibold">
							{titleSlot}
						</Typography>
					</div>
					{createButtonSlot}
				</div>
				<div className="flex flex-col gap-4">{cardsSlot}</div>
			</div>
			{footerSlot}
		</section>
	);
};
