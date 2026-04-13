import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(() => ({
  base: '/SkillXChange_with_Firebase/',
  plugins: [react()],
}));