import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import App from './App'
import './styles/global.css'

const root = document.getElementById('root')!
const app = <StrictMode><App /></StrictMode>
// Build pré-renderizado: hidrata. Desenvolvimento: monta do zero.
if (root.hasChildNodes()) hydrateRoot(root, app)
else createRoot(root).render(app)
