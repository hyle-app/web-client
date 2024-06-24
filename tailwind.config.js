import containerQueriesPlugin from '@tailwindcss/container-queries';

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{js,ts,jsx,tsx}', './index.html'],
	theme: {
		extend: {
			fontFamily: {
				default: 'Manrope, sans-serif'
			},
			fontSize: {
				'heading-1': 'var(--font-size-h1)',
				'heading-2': 'var(--font-size-h2)',
				'heading-3': 'var(--font-size-h3)',
				'heading-4': 'var(--font-size-h4)',
				'heading-5': 'var(--font-size-h5)',
				default: 'var(--font-size-default)'
			},
			fontWeight: {
				'heading-2': 'var(--font-weight-h2)',
				default: 'var(--font-weight-default)'
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
				'color-bg-95': 'var(--color-bg-95)',
				'color-bg-100': 'var(--color-bg-100)',
				'color-brand-primary-50': 'var(--color-brand-primary-50)',
				'color-text-and-icon-80': 'var(--color-text-and-icon-80)'
			}
		}
	},
	plugins: [containerQueriesPlugin]
};
