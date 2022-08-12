import { defineConfig, loadEnv } from 'vite'
import createVitePlugins from './vite/plugins'

// https://vitejs.dev/config/
export default defineConfig(({ mode, command }) => {
  const env = loadEnv(mode, process.cwd())
  // const { VITE_APP_ENV } = env
  return {
    base: '/',
    plugins: createVitePlugins(env, command === 'build')
  }
})
