import { cn } from '&shared/utils';
import { APPEARANCE_CLASSNAMES, VARIANT_CLASSNAMES, getAppearanceClassNames } from './constants';
import { Props } from './types';

export function Button(props: Props) {
	const { variant = 'button', appearance, iconSlot, className, tag, disabled } = props;

	const classes = cn(
		VARIANT_CLASSNAMES[variant],
		getAppearanceClassNames(variant, appearance),
		APPEARANCE_CLASSNAMES.common,
		{ 'flex items-center gap-2': iconSlot },
		{ 'boder-color-gray-30 bg-color-gray-30': disabled },
		'text-center',
		className
	);

	if (tag === 'a') {
		const { variant = 'button', appearance, iconSlot, className, children, tag, ...attributes } = props;
		return (
			<a {...attributes} className={classes}>
				{iconSlot}
				{children}
			</a>
		);
	}

	// For the sake of typescript
	if (tag === 'button' || !tag) {
		const { variant = 'button', appearance, iconSlot, className, children, tag, ...attributes } = props;
		return (
			<button className={classes} {...attributes}>
				{iconSlot}
				{children}
			</button>
		);
	}

	return null;
}
