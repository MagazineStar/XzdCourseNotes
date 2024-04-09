import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      /* 设置哪些包需要自动导入 */
      imports: ['vue','vue-router'],
      /* 设置导包的API-类型声明文件
      类型声明文件中的变量: 项目可以直接使用不用导包
       */
      /* 导入自定义的js文件  **表示导入utils下的所有js文件 */
      dirs:['src/utils/**'],
      dts: 'src/auto-imports.d.ts'
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
