import type { Meta } from '@storybook/react';

import { Skeleton } from '&shared/ui/skeleton';

import { EntityCard } from './component';

const meta: Meta<typeof EntityCard> = {
	title: 'shared/entity-card',
	component: EntityCard
};

export function WithTitleOnly() {
	return <EntityCard titleSlot={<Skeleton className="w-full h-6" />} />;
}

export function WithTitleAndLeftSlot() {
	return (
		<EntityCard
			titleSlot={<Skeleton className="w-full h-6" />}
			leftSlot={<Skeleton className="w-12 h-12 shrink-0" />}
		/>
	);
}

export function WithTitleLeftAndRightSlot() {
	return (
		<EntityCard
			titleSlot={<Skeleton className="w-full h-6" />}
			leftSlot={<Skeleton className="w-12 h-12 shrink-0" />}
			rightSlot={<Skeleton className="w-10 h-10 shrink-0" />}
		/>
	);
}

export function WithTitleLeftRightAndAdditionSlots() {
	return (
		<EntityCard
			titleSlot={<Skeleton className="w-full h-6 border-b-white border-b" />}
			additionSlot={<Skeleton className="w-full h-4" />}
			leftSlot={<Skeleton className="w-12 h-12 shrink-0" />}
			rightSlot={<Skeleton className="w-10 h-10 shrink-0" />}
		/>
	);
}

export function WithAllContentSlots() {
	return (
		<EntityCard
			titleSlot={<Skeleton className="w-full h-6 border-white border-b border-t" />}
			additionSlot={<Skeleton className="w-full h-4" />}
			relationSlot={<Skeleton className="w-full h-4" />}
			leftSlot={<Skeleton className="w-12 h-12 shrink-0" />}
			rightSlot={<Skeleton className="w-10 h-10 shrink-0" />}
		/>
	);
}

export function WithChildren() {
	return (
		<EntityCard
			titleSlot={<Skeleton className="w-full h-6 border-white border-b border-t" />}
			additionSlot={<Skeleton className="w-full h-4" />}
			relationSlot={<Skeleton className="w-full h-4" />}
			leftSlot={<Skeleton className="w-12 h-12 shrink-0" />}
			rightSlot={<Skeleton className="w-10 h-10 shrink-0" />}
			childrenCardsSlot={
				<>
					<EntityCard.ChildCard leftSlot={<Skeleton className="w-6 h-6 shrink-0" />} />
					<EntityCard.ChildCard leftSlot={<Skeleton className="w-6 h-6 shrink-0" />} />
					<EntityCard.ChildCard leftSlot={<Skeleton className="w-6 h-6 shrink-0" />} />
				</>
			}
		/>
	);
}

export function WithIndentedChildren() {
	return (
		<EntityCard
			titleSlot={<Skeleton className="w-full h-6 border-white border-b border-t" />}
			additionSlot={<Skeleton className="w-full h-4" />}
			relationSlot={<Skeleton className="w-full h-4" />}
			leftSlot={<Skeleton className="w-12 h-12 shrink-0" />}
			rightSlot={<Skeleton className="w-10 h-10 shrink-0" />}
			childrenCardsSlot={
				<EntityCard.ChildrenIndent>
					<EntityCard.ChildCard leftSlot={<Skeleton className="w-6 h-6 shrink-0" />} />
					<EntityCard.ChildCard leftSlot={<Skeleton className="w-6 h-6 shrink-0" />} />
					<EntityCard.ChildCard leftSlot={<Skeleton className="w-6 h-6 shrink-0" />} />
				</EntityCard.ChildrenIndent>
			}
		/>
	);
}

export default meta;
