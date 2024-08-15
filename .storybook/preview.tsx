import React from 'react';
import type { Preview } from '@storybook/react';

import '../src/index.css';

const preview: Preview = {
	parameters: {
		backgrounds: {
			default: 'light',
			values: [
				{
					name: 'light',
					value: 'var(--color-bg-95)'
				}
			]
		},
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i
			}
		}
	},
	decorators: [
		(Story) => (
			<div className="min-h-[250px] min-w-[250px] p-8">
				<Story />
			</div>
		)
	]
};

export default preview;
