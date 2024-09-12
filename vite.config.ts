import { TanStackRouterVite } from '@tanstack/router-vite-plugin';
import viteReact from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';
import tsconfigPaths from 'vite-tsconfig-paths';

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
