import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import App from './App'

/** Pré-renderização no build: o HTML chega pronto e o cliente apenas hidrata. */
export function render() {
  return renderToString(<StrictMode><App /></StrictMode>)
}
