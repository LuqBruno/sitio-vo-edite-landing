// Injeta o HTML renderizado no servidor em dist/index.html (executado após os dois builds).
import { readFile, writeFile, rm } from 'node:fs/promises'
import { fileURLToPath, pathToFileURL } from 'node:url'
import path from 'node:path'

const root = fileURLToPath(new URL('..', import.meta.url))
const ssrDir = path.join(root, 'dist-ssr')
const { render } = await import(pathToFileURL(path.join(ssrDir, 'entry-server.js')).href)
const file = path.join(root, 'dist', 'index.html')
const html = await readFile(file, 'utf8')
if (!html.includes('<div id="root"></div>')) throw new Error('Marcador #root não encontrado em dist/index.html')
await writeFile(file, html.replace('<div id="root"></div>', `<div id="root">${render()}</div>`))
await rm(ssrDir, { recursive: true, force: true })
console.log('Pré-renderização concluída: dist/index.html')
