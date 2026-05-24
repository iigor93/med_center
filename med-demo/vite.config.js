import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['demo-result.pdf', 'pwa-192.svg', 'pwa-512.svg'],
      manifest: {
        name: 'МедСервис Demo',
        short_name: 'МедСервис',
        description: 'Демо-PWA медицинского центра с записью, врачами и личным кабинетом.',
        theme_color: '#f8f9ff',
        background_color: '#f8f9ff',
        display: 'standalone',
        start_url: './',
        icons: [
          {
            src: 'pwa-192.svg',
            sizes: '192x192',
            type: 'image/svg+xml',
            purpose: 'any',
          },
          {
            src: 'pwa-512.svg',
            sizes: '512x512',
            type: 'image/svg+xml',
            purpose: 'any',
          },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,pdf}'],
      },
    }),
  ],
})
