import containerQueriesPlugin from '@tailwindcss/container-queries';

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{js,ts,jsx,tsx}', './index.html'],
	theme: {
		extend: {
			minHeight: {
				'entity-card': 'var(--entity-card-min-height)'
			},
			fontFamily: {
				default: 'Manrope, sans-serif'
			},
			fontSize: {
				'heading-1': 'var(--font-size-h1)',
				'heading-2': 'var(--font-size-h2)',
				'heading-3': 'var(--font-size-h3)',
				'heading-4': 'var(--font-size-h4)',
				'heading-5': 'var(--font-size-h5)',
				'caption-1': 'var(--font-size-caption-1)',
				'caption-2': 'var(--font-size-caption-2)',
				'subheader-1' : 'var(--font-size-subheader-1)',
				default: 'var(--font-size-default)',
				paragraph: 'var(--font-size-default)'
			},
			fontWeight: {
				'heading-2': 'var(--font-weight-h2)',
				'caption-2': 'var(--font-weight-caption-2)',
				paragraph: 'var(--font-weight-default)',
				default: 'var(--font-weight-default)'
			},
			lineHeight: {
				'caption-1': 'var(--line-height-caption-1)',
				'caption-2': 'var(--line-height-caption-2)',
				default: 'var(--line-height-default)',
				paragraph: 'var(--line-height-default)'
			},
			gridTemplateColumns: {
				'main-layout': 'var(--nav-sidebar-current-width) 1fr',
				'main-layout-expanded': 'var(--nav-sidebar-wide-width) 1fr',
				'main-layout-narrow': 'var(--nav-sidebar-narrow-width) 1fr'
			},
			gridTemplateRows: {
				'main-layout': '104px 1fr'
			},
			colors: {
				'color-gray-10': 'var(--color-gray-10)',
				'color-gray-30': 'var(--color-gray-30)',
				'color-gray-50': 'var(--color-gray-50)',
				'color-gray-80': 'var(--color-gray-80)',

				'color-error': 'var(--color-error)',
				'color-warning': 'var(--color-warning)',
				'color-success': 'var(--color-success)',

				'color-bg-95': 'var(--color-bg-95)',
				'color-bg-100': 'var(--color-bg-100)',

				'color-brand-primary-50': 'var(--color-brand-primary-50)',
				'color-brand-primary-70': 'var(--color-brand-primary-70)',
				'color-brand-secondary-80': 'var(--color-brand-secondary-80)',

				'color-text-and-icon-80': 'var(--color-text-and-icon-80)',
				'color-text-and-icon-70': 'var(--color-text-and-icon-70)',

				'color-white': '#fff',

				'color-brand-solid-gradient': 'var(--color-brand-solid-gradient)',

				'color-overlay-bg': 'var(--color-overlay-bg)'
			},
			boxShadow: {
				card: 'var(--card-shadow)',
				'balance-chart-col': 'var(--balance-chart-col-shadow)'
			},
			stroke: {
				'color-gray-10': 'var(--color-gray-10)',
				'color-gray-30': 'var(--color-gray-30)',
				'color-gray-50': 'var(--color-gray-50)',
				'color-gray-80': 'var(--color-gray-80)',
				'color-error': 'var(--color-error)',
				'color-bg-95': 'var(--color-bg-95)',
				'color-bg-100': 'var(--color-bg-100)',
				'color-brand-primary-50': 'var(--color-brand-primary-50)',
				'color-text-and-icon-80': 'var(--color-text-and-icon-80)'
			},
			transitionProperty: {
				'colors-and-opacity': 'color, background-color, border-color, text-decoration-color, fill, stroke, opacity'
			},
			zIndex: {
				sidebar: 50,
				'sidebar-overlay': 49,
				'select-dropdown': 51
			}
		}
	},
	plugins: [containerQueriesPlugin]
};
