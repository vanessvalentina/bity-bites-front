import { createContext } from "react"

/**
 * Este contexto se utiliza para gestionar la autenticación de usuarios en la aplicación.
 *
 * @context
 * @property {String}   token             Token JWT de la sesión (vive en memoria)
 * @property {Object}   usuario           Los datos del usuario autenticado (sin contraseña)
 * @property {Function} iniciarSesion     Guarda token y usuario al entrar
 * @property {Function} cerrarSesion      Borra la sesión
 * @property {Function} actualizarUsuario Cambia los datos tras editar el perfil
 * @components {Login, Navbar, Perfil, Admin, Carrito, EditarPerfil, AvisoRegistro…}
 */
const SesionContext = createContext()

export default SesionContext
