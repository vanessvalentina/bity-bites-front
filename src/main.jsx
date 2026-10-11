/*-----------------------------------------------------------------------*\
 * main.jsx — punto de entrada de React: carga los estilos (index.css) y pinta <App />
 *-----------------------------------------------------------------------*/
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
// FUERA DEL TEMARIO: Vercel Web Analytics cuenta visitas y páginas vistas sin cookies ni datos personales
// (por eso no hace falta banner de cookies). Hecho con ayuda de IA (Claude).
// Documentación: https://vercel.com/docs/analytics/quickstart
import { Analytics } from '@vercel/analytics/react'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <Analytics />
  </StrictMode>,
)
