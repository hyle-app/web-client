import { Appearance, Variant } from './types';

export const VARIANT_CLASSNAMES: Record<Variant, string> = {
	button: 'py-4 px-7 rounded-[16px]',
	text: 'p-0',
	icon: 'p-2 rounded-[14px]'
};

export const APPEARANCE_CLASSNAMES: Record<Appearance | 'common', string> = {
	primary: 'bg-color-brand-primary-50 text-color-white',
	secondary: 'bg-transparent text-color-brand-primary-50',
	ghost: 'bg-color-gray-10 text-color-text-and-icon-80',
	common: 'border border-1 border-color-brand-primary-50'
};

const TEXT_APPEARANCE_CLASSNAMES: Record<Appearance | 'common', string> = {
	primary: 'text-color-brand-primary-50 ',
	secondary: 'text-transparent ',
	ghost: 'text-color-gray-80',
	common: ''
};

export function getAppearanceClassNames(variant: Variant, appearance: Appearance) {
	if (variant === 'text') {
		return TEXT_APPEARANCE_CLASSNAMES[appearance];
	}

	return APPEARANCE_CLASSNAMES[appearance];
}
