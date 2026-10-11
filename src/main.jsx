/*-----------------------------------------------------------------------*\
 * main.jsx — punto de entrada de React: carga los estilos (index.css) y pinta <App />
 *-----------------------------------------------------------------------*/
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
