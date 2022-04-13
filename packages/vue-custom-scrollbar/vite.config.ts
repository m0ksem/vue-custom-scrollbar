import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

const LIB_NAME = 'vue-custom-scrollbar'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: './src/vue-custom-scrollbar',
      name: LIB_NAME,
      fileName: (format) => format === 'es' ? `${LIB_NAME}.mjs` : `${LIB_NAME}.js`,
    },
    rollupOptions: {
      external: ['vue', '@vueuse/core'],
      output: {
        globals: {
          vue: 'Vue',
        },
        // Rename default style.css
        assetFileNames: (asset) => asset.name === 'style.css' ? `${LIB_NAME}.css` : asset.name
      },
    },
  },
})
