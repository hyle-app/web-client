import { type ClassValue, clsx } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

const twMerge = extendTailwindMerge({
	// use the `extend` key in case you want to extend instead of override
	override: {
		classGroups: {
			'font-size': [
				'heading-1',
				'heading-2',
				'heading-3',
				'heading-4',
				'heading-5',
				'caption-1',
				'default',
				'paragraph'
			],
			'text-color': [
				'text-color-gray-10',
				'text-color-gray-30',
				'text-color-gray-50',
				'text-color-gray-80',
				'text-color-error',
				'text-color-bg-95',
				'text-color-bg-100',
				'text-color-brand-primary-50',
				'text-color-text-and-icon-80',
				'text-color-white'
			]
		}
	}
});

export function cn(...inputs: ClassValue[]): string {
	return twMerge(clsx(inputs));
}
