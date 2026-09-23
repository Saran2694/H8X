import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const srcImg = path.resolve(__dirname, 'img')
const publicImg = path.resolve(__dirname, 'public', 'img')

function syncDir(src, dest) {
  if (!fs.existsSync(src)) return;
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const s = path.join(src, entry.name);
    const d = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      syncDir(s, d);
    } else {
      try {
        if (!fs.existsSync(d) || fs.statSync(s).mtimeMs > fs.statSync(d).mtimeMs) {
          fs.copyFileSync(s, d);
        }
      } catch (e) {
        // ignore locked file or copy error
      }
    }
  }
}

// Synchronize all assets into public/img so Vite & Vercel build will copy them seamlessly
syncDir(srcImg, publicImg);

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'sync-dist-img',
      closeBundle() {
        const distImg = path.resolve(__dirname, 'dist', 'img');
        syncDir(srcImg, distImg);
      }
    }
  ],
  server: {
    port: 3000,
    host: true,
    hmr: {
      overlay: true
    }
  }
})
