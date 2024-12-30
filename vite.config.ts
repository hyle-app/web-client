import { TanStackRouterVite } from '@tanstack/router-plugin/vite';
import viteReact from '@vitejs/plugin-react';
import path from 'node:path';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
	plugins: [
		svgr({
			svgrOptions: { exportType: 'default', ref: true, svgo: false, titleProp: true },
			include: '**/*.svg'
		}),
		viteReact({
			babel: {
				plugins: ['effector/babel-plugin']
			}
		}),
		TanStackRouterVite({
			routesDirectory: './src/pages',
			routeFileIgnorePattern: '.(model|constants|types|relations).tsx?'
		})
	],
	resolve: {
		alias: {
			'&entities': path.resolve(__dirname, 'src/entities'),
			'&shared': path.resolve(__dirname, '/src/shared'),
			'&features': path.resolve(__dirname, '/src/features'),
			'&widgets': path.resolve(__dirname, '/src/widgets')
		}
	}
});
