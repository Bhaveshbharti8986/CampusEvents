import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 5173,                 // make sure this matches your dev server
    host: true,                 // allow external access (important for tunnels)
     // allow all Ngrok subdomains
    // if you still want LocalTunnel, you can add '.loca.lt' here too
  }
})
