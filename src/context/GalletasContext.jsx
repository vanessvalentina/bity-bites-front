import { createContext } from "react"

/**
 * Este contexto guarda el catálogo de galletas para toda la aplicación (se crea en App.jsx).
 *
 * @context
 * @property {Array}    galletas         Galletas que vienen de la API
 * @property {Boolean}  cargando         Si todavía se están pidiendo
 * @property {Boolean}  error            Si la API ha fallado
 * @property {Function} agregarGalleta   Añade una galleta a la lista (Create)
 * @property {Function} editarGalleta    Cambia una galleta de la lista (Update)
 * @property {Function} eliminarGalleta  Quita una galleta de la lista (Delete)
 * @components {Inicio, Packs, Admin, FormularioGalleta, ModalEditar, ModalBorrar, Pedido}
 */
const GalletasContext = createContext()

export default GalletasContext