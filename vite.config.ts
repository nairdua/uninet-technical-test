/// <reference types="vitest"> />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA, VitePWAOptions } from 'vite-plugin-pwa'
import tsconfigPaths from 'vite-tsconfig-paths'

const manifestForPlugin: Partial<VitePWAOptions> = {
  registerType: 'prompt',
  devOptions: {
    enabled: true,
  },
  includeAssets: [
    'vite.svg',
    'manifest-icon-192.maskable.png',
    'manifest-icon-512.maskable.png',
    'apple-icon-180.png',
  ],
  manifest: {
    name: 'Technical Test',
    short_name: 'tech-test',
    description: 'Uninet Technical Test',
    icons: [
      {
        src: '/manifest-icon-192.maskable.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/manifest-icon-512.maskable.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: '/apple-icon-180.png',
        sizes: '180x180',
        type: 'image/png',
        purpose: 'apple touch icon',
      },
      {
        src: '/manifest-icon-192.maskable.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any maskable',
      },
    ],
    theme_color: '#ffffff',
    background_color: '#ffffff',
    display: 'standalone',
    scope: '/',
    start_url: '/',
    orientation: 'portrait',
  },
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths(), VitePWA(manifestForPlugin)],
  test: {
    globals: true,
    environment: 'happy-dom',
    setupFiles: ['./src/setupTest.ts'],
  },
})
