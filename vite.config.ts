import { TanStackRouterVite } from '@tanstack/router-plugin/vite';
import viteReact from '@vitejs/plugin-react';
import path from 'node:path';
import { defineConfig } from 'vite';
import { createHtmlPlugin } from 'vite-plugin-html';
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
		}),
		createHtmlPlugin({
			minify: true,
			inject: {
				data: {
					metaTags: `
            <meta http-equiv="Cache-Control" content="no-store, no-cache, must-revalidate, max-age=0">
            <meta http-equiv="Pragma" content="no-cache">
            <meta http-equiv="Expires" content="0">
          `
				},
				tags: [
					{
						tag: 'meta',
						attrs: { 'http-equiv': 'Cache-Control', content: 'no-store, no-cache, must-revalidate, max-age=0' },
						injectTo: 'head'
					},
					{
						tag: 'meta',
						attrs: { 'http-equiv': 'Pragma', content: 'no-cache' },
						injectTo: 'head'
					},
					{
						tag: 'meta',
						attrs: { 'http-equiv': 'Expires', content: '0' },
						injectTo: 'head'
					}
				]
			}
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
