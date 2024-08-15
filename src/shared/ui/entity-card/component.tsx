import React from 'react';

import { cn } from '&shared/utils';

import type { Props } from './types';
import { EntityCardCircularProgressBar, EntityCardEmoji, EntityChildCard, EntityChildredIndent } from './slots';

export function EntityCard({
	titleSlot = null,
	additionSlot = null,
	childrenCardsSlot = null,
	relationSlot = null,
	leftSlot = null,
	rightSlot = null,

	className,
	...attributes
}: Props) {
	const WrapperElement = childrenCardsSlot ? 'article' : React.Fragment;
	const wrapperElementProps = childrenCardsSlot ? { className: 'flex flex-col gap-2' } : {};

	return (
		<WrapperElement {...wrapperElementProps}>
			<button
				className={cn(
					'min-h-entity-card w-full bg-color-bg-100 rounded-2xl px-4 py-3 flex items-center justify-between gap-4',
					className
				)}
				{...attributes}
			>
				{leftSlot}
				<span className="flex shrink-1 w-full flex-col items-start">
					{relationSlot}
					{titleSlot}
					{additionSlot}
				</span>
				{rightSlot}
			</button>
			{childrenCardsSlot}
		</WrapperElement>
	);
}

EntityCard.ChildCard = EntityChildCard;
EntityCard.ChildrenIndent = EntityChildredIndent;
EntityCard.Emoji = EntityCardEmoji;
EntityCard.ProgressCircleBar = EntityCardCircularProgressBar;
