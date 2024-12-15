import { cn } from '&shared/utils';
import { APPEARANCE_CLASSNAMES, VARIANT_CLASSNAMES, getAppearanceClassNames } from './constants';
import { Props } from './types';

export function Button({ variant = 'button', appearance, iconSlot, className, children, ...attributes }: Props) {
	return (
		<button
			className={cn(
				VARIANT_CLASSNAMES[variant],
				getAppearanceClassNames(variant, appearance),
				APPEARANCE_CLASSNAMES.common,
				{ 'flex items-center gap-2': iconSlot },
				{ 'boder-color-gray-30 bg-color-gray-30': attributes.disabled },
				className
			)}
			{...attributes}
		>
			{iconSlot}
			{children}
		</button>
	);
}
