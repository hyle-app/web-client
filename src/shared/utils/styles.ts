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
				'color-gray-10',
				'color-gray-30',
				'color-gray-50',
				'color-gray-80',
				'color-error',
				'color-bg-95',
				'color-bg-100',
				'color-brand-primary-50',
				'color-text-and-icon-80'
			]
		}
	}
});

export function cn(...inputs: ClassValue[]): string {
	return twMerge(clsx(inputs));
}
