import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
import { vitePluginForArco } from '@arco-plugins/vite-react'

const host = process.env.TAURI_DEV_HOST

// https://vitejs.dev/config/
export default defineConfig(async () => ({
  // 开发环境使用gitHub action部署到 github pages，所以需要配置base为仓库名
  // 如果要部署到 <user>.github.io/<repo>，则 base 应该为 '/<repo>/'
  // 如果要部署到 <user>.github.io，则 base 使其默认为 '/'
  base: process.env.NODE_ENV === 'production' ? '/sea-super/' : '/',
  plugins: [
    react(),
    tailwindcss(),
    vitePluginForArco({
      style: 'css'
    })
  ],
  css: {
    preprocessorOptions: {
      scss: {}
    }
  },
  // Vite options tailored for Tauri development and only applied in `tauri dev` or `tauri build`
  //
  // 1. prevent vite from obscuring rust errors 防止 Vite 清除 Rust 显示的错误
  clearScreen: false,
  // 2. tauri expects a fixed port, fail if that port is not available
  server: {
    port: 1420,
    strictPort: true,
    host: host || false,
    hmr: host
      ? {
          protocol: 'ws',
          host,
          port: 1421
        }
      : undefined,
    watch: {
      // 3. tell vite to ignore watching `src-tauri`
      ignored: ['**/src-tauri/**']
    }
  },
  // 3. // 添加有关当前构建目标的额外前缀，使这些 CLI 设置的 Tauri 环境变量可以在客户端代码中访问
  envPrefix: ['VITE_', 'TAURI_ENV_*'],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  build: {
    minify: true, // 是否打包压缩
    emptyOutDir: true, // 构建时清空该目录
    chunkSizeWarningLimit: 2000, // 触发打包警告阈值
    brotliSize: true, // 启用 brotli 压缩大小报告
    cssCodeSplit: true, // css 分离
    // 配置 rollup 打包选项
    rollupOptions: {
      output: {
        // 静态资源分类打包
        entryFileNames: 'js/[name].[hash].js', // 用于命名代码拆分时创建的共享块的输出命名
        chunkFileNames: 'js/[name].[hash].js',
        assetFileNames: '[ext]/[name].[hash].[ext]', // 用于输出静态资源的命名，[ext]表示文件扩展名
        manualChunks(id: string) {
          if (id.includes('node_modules')) {
            return id
              .toString()
              .split('node_modules/')[1]
              .split('/')[0]
              .toString()
          }
        }
      }
    }
  }
}))
