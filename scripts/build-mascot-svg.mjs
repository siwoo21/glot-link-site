import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')
const pngPath = path.join(root, 'public', 'glot-mascot-shape.png')
const outPath = path.join(root, 'public', 'glot-mascot.svg')

async function getCenterOffset(imagePath) {
  const { data, info } = await sharp(imagePath).ensureAlpha().raw().toBuffer({ resolveWithObject: true })
  const { width, height, channels } = info
  let minX = width
  let minY = height
  let maxX = 0
  let maxY = 0

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * channels
      const lum = data[i] * 0.299 + data[i + 1] * 0.587 + data[i + 2] * 0.114
      if (lum < 128) {
        minX = Math.min(minX, x)
        minY = Math.min(minY, y)
        maxX = Math.max(maxX, x)
        maxY = Math.max(maxY, y)
      }
    }
  }

  const cx = (minX + maxX) / 2
  const cy = (minY + maxY) / 2
  return {
    shiftX: width / 2 - cx,
    shiftY: height / 2 - cy,
  }
}

const b64 = fs.readFileSync(pngPath).toString('base64')
const { shiftX, shiftY } = await getCenterOffset(pngPath)
const x = Math.round(shiftX * 10) / 10
const y = Math.round(shiftY * 10) / 10

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
      <image href="data:image/png;base64,${b64}" x="${x}" y="${y}" width="1024" height="1024" filter="url(#invert)"/>
    </mask>
  </defs>
  <rect width="1024" height="1024" fill="url(#glotBrand)" mask="url(#catMask)"/>
</svg>`

fs.writeFileSync(outPath, svg)
console.log('center offset', { x, y })
console.log('wrote', outPath, fs.statSync(outPath).size, 'bytes')
