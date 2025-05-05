import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5173,
    strictPort: true,              // fail if 5173 is in use
    allowedHosts: ['pageandpicture.duckdns.org'],
    hmr: {
      host: 'pageandpicture.duckdns.org',
      protocol: 'wss'
    }
  }
})
