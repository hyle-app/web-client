import { EntityCard } from '&shared/ui/entity-card';
import { Typography } from '&shared/ui/typography';
import { cn } from '&shared/utils';
import { Props } from './types';

export function SubtaskCard({ isCompleted, className, children, ...attributes }: Props) {
	return (
		<EntityCard.ChildCard
			className={className}
			titleSlot={
				<Typography
					variant="caption-1"
					className={cn({
						'line-through text-color-gray-80': isCompleted
					})}
				>
					{children}
				</Typography>
			}
			{...attributes}
		/>
	);
}
