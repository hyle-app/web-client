import { cn, unicodeToEmoji } from '&shared/utils';

import { Props } from './types';

export function EntityCardEmoji({ code, className, ...attributes }: Props) {
	const emoji = unicodeToEmoji(code);
	return (
		<div
			className={cn(
				'w-10 h-10 rounded-2xl flex items-center justify-center bg-color-bg-100 shadow-card relative',
				className
			)}
			{...attributes}
		>
			<p className="absolute top-1/2 left-1/2 -translate-x-1/2 translate-y-[calc(-50%+8px)] opacity-25 blur-[4px]">
				{emoji}
			</p>
			<p className="relative">{emoji}</p>
		</div>
	);
}
