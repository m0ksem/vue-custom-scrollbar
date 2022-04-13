import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: './src/vue-custom-scrollbar',
      name: 'vue-custom-scrollbar',
      fileName: (format) => format === 'es' ? 'vue-custom-scrollbar.mjs' : 'vue-custom-scrollbar.js',
    },
    rollupOptions: {
      external: ['vue', '@vueuse/core'],
      output: {
        globals: {
          vue: 'Vue',
        }
      }
    },
  },
})
