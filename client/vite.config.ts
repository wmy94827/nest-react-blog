import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import WindiCSS from "vite-plugin-windicss";
import { resolve } from "path";
const pathResolve = (dir: string) => resolve(__dirname, dir);

// https://vitejs.dev/config/
export default defineConfig({
  base: "/blog-client",
  plugins: [vue(), WindiCSS()],
  resolve: {
    alias: {
      "@": pathResolve("./src"), // 设置 `@` 指向 `src` 目录
    },
  },
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: {
          "primary-color": "#d71a18",
        },
        javascriptEnabled: true,
      },
    },
  },
  build: {
    outDir: "dist", // 指定打包路径，默认为项目根目录下的 dist 目录
    terserOptions: {
      compress: {
        keep_infinity: true, // 防止 Infinity 被压缩成 1/0，这可能会导致 Chrome 上的性能问题
        drop_console: true, // 生产环境去除 console
        drop_debugger: true, // 生产环境去除 debugger
      },
    },
    chunkSizeWarningLimit: 1500, // chunk 大小警告的限制（以 kbs 为单位）
  },
  server: {
    port: 3100, // 设置服务启动端口号
    open: true, // 设置服务启动时是否自动打开浏览器
    cors: true, // 允许跨域
    // 设置代理，根据我们项目实际情况配置
    proxy: {
      "/baseUrl/": {
        target: "http://127.0.0.1:8888/api",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/baseUrl/, ""),
      },
    },
  },
});
