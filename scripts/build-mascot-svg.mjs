import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')
const pngPath = path.join(root, 'public', 'glot-mascot-shape.png')
const outPath = path.join(root, 'public', 'glot-mascot.svg')

const b64 = fs.readFileSync(pngPath).toString('base64')

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" fill="none" aria-hidden="true">
  <defs>
    <linearGradient id="glotBrand" x1="120" y1="920" x2="900" y2="80" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#312e81"/>
      <stop offset="38%" stop-color="#6366f1"/>
      <stop offset="72%" stop-color="#818cf8"/>
      <stop offset="100%" stop-color="#38bdf8"/>
    </linearGradient>
    <filter id="invert" color-interpolation-filters="sRGB">
      <feColorMatrix type="matrix" values="-1 0 0 0 1  0 -1 0 0 1  0 0 -1 0 1  0 0 0 1 0"/>
    </filter>
    <mask id="catMask">
      <image href="data:image/png;base64,${b64}" width="1024" height="1024" filter="url(#invert)"/>
    </mask>
  </defs>
  <rect width="1024" height="1024" fill="url(#glotBrand)" mask="url(#catMask)"/>
</svg>`

fs.writeFileSync(outPath, svg)
console.log('wrote', outPath, fs.statSync(outPath).size, 'bytes')
