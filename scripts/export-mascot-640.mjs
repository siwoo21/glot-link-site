import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')
const svgPath = path.join(root, 'public', 'glot-mascot.svg')
const pngOut = path.join(root, 'public', 'glot-mascot-640.png')
const svgOut = path.join(root, 'public', 'glot-mascot-640.svg')

const RENDER_SIZE = 1024
const OUT_SIZE = 640
const PAD_X_RATIO = 0.085
const PAD_Y_RATIO = 0.095

async function getAlphaBounds(buffer) {
  const { data, info } = await sharp(buffer).ensureAlpha().raw().toBuffer({ resolveWithObject: true })
  const { width, height, channels } = info
  let minX = width
  let minY = height
  let maxX = 0
  let maxY = 0

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const alpha = data[(y * width + x) * channels + 3]
      if (alpha > 16) {
        minX = Math.min(minX, x)
        minY = Math.min(minY, y)
        maxX = Math.max(maxX, x)
        maxY = Math.max(maxY, y)
      }
    }
  }

  return {
    minX,
    minY,
    maxX,
    maxY,
    width: maxX - minX + 1,
    height: maxY - minY + 1,
    canvasWidth: width,
    canvasHeight: height,
  }
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max)
}

const svg = fs.readFileSync(svgPath, 'utf8')
const rendered = await sharp(Buffer.from(svg)).resize(RENDER_SIZE, RENDER_SIZE).png().toBuffer()
const bounds = await getAlphaBounds(rendered)

const padX = Math.round(bounds.width * PAD_X_RATIO)
const padY = Math.round(bounds.height * PAD_Y_RATIO)
const cx = (bounds.minX + bounds.maxX) / 2
const cy = (bounds.minY + bounds.maxY) / 2
const cropWidth = bounds.width + padX * 2
const cropHeight = bounds.height + padY * 2
const cropSize = Math.ceil(Math.max(cropWidth, cropHeight))

const left = clamp(Math.round(cx - cropSize / 2), 0, RENDER_SIZE - cropSize)
const top = clamp(Math.round(cy - cropSize / 2), 0, RENDER_SIZE - cropSize)

await sharp(rendered)
  .extract({ left, top, width: cropSize, height: cropSize })
  .resize(OUT_SIZE, OUT_SIZE)
  .png()
  .toFile(pngOut)

const sizedSvg = svg.replace(
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024"',
  `<svg xmlns="http://www.w3.org/2000/svg" width="${OUT_SIZE}" height="${OUT_SIZE}" viewBox="${left} ${top} ${cropSize} ${cropSize}"`,
)
fs.writeFileSync(svgOut, sizedSvg)

const outBounds = await getAlphaBounds(await fs.promises.readFile(pngOut))
const fillRatio = ((outBounds.width * outBounds.height) / (OUT_SIZE * OUT_SIZE) * 100).toFixed(1)

console.log('crop', { left, top, cropSize, padX, padY })
console.log('fill', `${fillRatio}% of ${OUT_SIZE}x${OUT_SIZE}`)
console.log('wrote', pngOut)
console.log('wrote', svgOut)
