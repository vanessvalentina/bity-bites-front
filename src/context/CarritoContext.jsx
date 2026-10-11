import { createContext } from "react"

/**
 * Este contexto guarda el carrito "Tu combo" para toda la aplicación (se crea en App.jsx).
 *
 * @context
 * @property {Array}    carrito           Galletas y packs elegidos con su cantidad
 * @property {Function} agregarAlCarrito  Añade una galleta o pack
 * @property {Function} agregarVarios     Añade varias de golpe (caja de Packs)
 * @property {Function} cambiarCantidad   Cambia las unidades de una línea
 * @property {Function} quitarDelCarrito  Quita una línea
 * @property {Function} vaciarCarrito     Deja el carrito vacío
 * @components {Navbar, GalletaCard, Inicio, Packs, Carrito, Login}
 */
const CarritoContext = createContext()

export default CarritoContext
