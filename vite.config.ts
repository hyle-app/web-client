import { defineConfig } from 'vite';
import viteReact from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import svgr from 'vite-plugin-svgr';
import { TanStackRouterVite } from '@tanstack/router-vite-plugin';

export default defineConfig({
	plugins: [
		svgr({
			svgrOptions: { exportType: 'default', ref: true, svgo: false, titleProp: true },
			include: '**/*.svg'
		}),
		TanStackRouterVite({
			routesDirectory: './src/pages',
			experimental: {
				enableCodeSplitting: true
			}
		}),
		viteReact(),
		tsconfigPaths()
	]
});
