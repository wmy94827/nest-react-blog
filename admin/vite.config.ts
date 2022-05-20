import { defineConfig, loadEnv, ConfigEnv } from 'vite';
import react from '@vitejs/plugin-react';
import svgrPlugin from '@arco-plugins/vite-plugin-svgr';
import WindiCSS from 'vite-plugin-windicss';
import vitePluginForArco from '@arco-plugins/vite-react';
import setting from './src/settings.json';

// https://vitejs.dev/config/
export default (config: ConfigEnv) =>
  defineConfig({
    base: loadEnv(config.mode, process.cwd()).VITE_PUBLIC_PATH,
    resolve: {
      alias: [{ find: '@', replacement: '/src' }],
    },
    plugins: [
      react(),
      svgrPlugin({
        svgrOptions: {},
      }),
      vitePluginForArco({
        theme: '@arco-themes/react-arco-pro',
        modifyVars: {
          'arcoblue-6': setting.themeColor,
        },
      }),
      WindiCSS(),
    ],
    server: {
      open: true,
      proxy: {
        '/baseUrl/': {
          target: 'http://127.0.0.1:8888/api',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/baseUrl/, ''),
        },
      },
    },
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
        },
      },
    },
  });
