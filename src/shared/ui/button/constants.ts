import { Appearance, Variant } from './types';

export const VARIANT_CLASSNAMES: Record<Variant, string> = {
	'narrow-button': 'py-2 px-4 rounded-[16px]',
	button: 'py-4 px-7 rounded-[24px]',
	text: 'p-0',
	icon: 'p-2 rounded-[14px]'
};

export const APPEARANCE_CLASSNAMES: Record<Appearance | 'common', string> = {
	error: 'bg-color-error text-color-white',
	primary: 'bg-color-brand-primary-50 text-color-white',
	'primary-outline': 'border-color-brand-primary-50 border border-solid text-color-brand-primary-50',
	secondary: 'bg-transparent text-color-brand-primary-50',
	ghost: 'bg-color-gray-10 text-color-text-and-icon-80',
	common: 'border border-[1px] border-color-brand-primary-50'
};

const TEXT_APPEARANCE_CLASSNAMES: Record<Appearance | 'common', string> = {
	primary: 'text-color-brand-primary-50 ',
	'primary-outline': 'text-color-brand-primary-50',
	secondary: 'text-transparent ',
	ghost: 'text-color-gray-80',
	common: '',
	error: 'text-color-white'
};

export function getAppearanceClassNames(variant: Variant, appearance: Appearance) {
	if (variant === 'text') {
		return TEXT_APPEARANCE_CLASSNAMES[appearance];
	}

	return APPEARANCE_CLASSNAMES[appearance];
}
