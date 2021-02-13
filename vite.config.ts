import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import svgLoader from 'vite-svg-loader'

export default defineConfig({
  plugins: [vue(), svgLoader()],
  optimizeDeps: {
    include: ['firebase/app', 'firebase/firestore', 'firebase/auth']
  }
})
