import { execFileSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.dirname(fileURLToPath(import.meta.url))
const envPath = path.join(root, '..', '.env.local')
const lines = fs.readFileSync(envPath, 'utf8').split(/\r?\n/)
const vars = {}

for (const line of lines) {
  if (!line || line.startsWith('#')) continue
  const idx = line.indexOf('=')
  if (idx === -1) continue
  const key = line.slice(0, idx).trim()
  const value = line.slice(idx + 1).trim().replace(/^"|"$/g, '')
  if (key.startsWith('VITE_')) vars[key] = value
}

const envs = ['production', 'preview', 'development']

for (const [key, value] of Object.entries(vars)) {
  for (const env of envs) {
    const args = ['vercel', 'env', 'add', key, env, '--force']
    if (env !== 'development') args.push('--sensitive')
    execFileSync('npx', args, {
      cwd: path.join(root, '..'),
      input: value,
      stdio: ['pipe', 'inherit', 'inherit'],
      shell: true,
    })
    console.log(`set ${key} (${env})`)
  }
}

console.log('done')
