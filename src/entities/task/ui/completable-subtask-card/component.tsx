import { Checkbox } from '&shared/ui/checkbox';
import { EntityCard } from '&shared/ui/entity-card';
import { Typography } from '&shared/ui/typography';
import { cn } from '&shared/utils';
import { Props } from './types';

export function CompletableSubtaskCard({ isCompleted, className, children, onCompletionToggle, ...attributes }: Props) {
	return (
		<EntityCard.ChildCard
			leftSlot={
				<div className="w-6 h-6 flex items-center justify-center">
					<Checkbox
						checked={isCompleted}
						onChange={(event) => {
							if (onCompletionToggle) {
								onCompletionToggle();
								event.stopPropagation();
							}
						}}
					/>
				</div>
			}
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
