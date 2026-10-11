import { useState, useContext, useEffect } from "react"
import { Navigate } from "react-router-dom"
import GalletasContext from "@/context/GalletasContext"
import SesionContext from "@/context/SesionContext"
import FormularioGalleta from "@/components/FormularioGalleta"
import GalletaAdmin from "@/components/GalletaAdmin"
import Pedido from "@/components/Pedido"
import { cambiarEstadoPedido, marcarMensaje, borrarMensaje } from "@/services/api"
import Mensaje from "@/components/Mensaje"
import EditarPerfil from "@/components/EditarPerfil"
import useFetch from "@/hooks/useFetch"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { ESTADOS_ACTIVOS, API_URL } from "@/const/constantes"

/**
 * Página del panel de Gabriela (solo rol admin): pedidos, mensajes, catálogo (CRUD) y su cuenta.
 * @hook     {useContext} GalletasContext: lista de galletas del catálogo
 * @hook     {useContext} SesionContext: token, usuario y cerrarSesion
 * @hook     {useState}   vista: pestaña elegida y filtro de pedidos (agrupados)
 * @hook     {useFetch}   pedidos y mensajes desde la API (rutas protegidas)
 * @hook     {useEffect}  subir arriba del todo al entrar
 */
function Admin(){

    // Al entrar en la página, empezar arriba del todo (si no, se queda el scroll de la página anterior)
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    let { galletas } = useContext(GalletasContext)
    let { token, usuario, cerrarSesion } = useContext(SesionContext)

    // Un solo useState para la vista del panel (datos relacionados):
    // pestana = "pedidos" o "catalogo" · verPedidos = "activos" (pendiente/preparando/listo) o "todos"
    let [vista, setVista] = useState({ pestana : "pedidos", verPedidos : "activos" })
    let { pestana, verPedidos } = vista

    let esAdmin = token && usuario.rol == "admin"

    // Todos los pedidos con el hook personalizado (solo si es Gabriela)
    let { datos : pedidos, cargando, setDatos : setPedidos } = useFetch(esAdmin ? API_URL + "/pedidos" : null, token)

    // Mensajes del formulario de Contacto (mismo hook personalizado)
    let { datos : mensajes, cargando : cargandoMensajes, setDatos : setMensajes } = useFetch(esAdmin ? API_URL + "/mensajes" : null, token)

    // Sin sesión -> login (y al entrar vuelve aquí)
    if(!token){
        return <Navigate to="/login" />
    }

    // Con sesión pero sin ser Gabriela -> no puede entrar
    if(!esAdmin){
        return <section className="placeholder">
            <h2>Zona privada</h2>
            <p>Esta parte es solo para Gabriela.</p>
        </section>
    }

    // Marcar un mensaje como leído / no leído (API + estado con map y spread)
    function marcar(id, leido){
        marcarMensaje(id, leido, token)
        .then( () => setMensajes( anteriores => anteriores.map( m => m._id == id ? { ...m, leido } : m ) ) )
    }

    // Borrar un mensaje (API + estado con filter)
    function borrar(id){
        borrarMensaje(id, token)
        .then( () => setMensajes( anteriores => anteriores.filter( m => m._id != id ) ) )
    }

    function cambiarEstado(id, estado){
        cambiarEstadoPedido(id, estado, token)
        .then( () => setPedidos( anteriores => anteriores.map( p => p._id == id ? { ...p, estado } : p ) ) )
    }

    // FUERA DEL TEMARIO: .includes() comprueba si el estado está en la lista de "activos".
    // Hecho con ayuda de IA (Claude). Documentación: https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/includes
    let pedidosVisibles = pedidos.filter( p => verPedidos == "todos" || ESTADOS_ACTIVOS.includes(p.estado) )
    let pendientes = pedidos.filter( p => p.estado == "pendiente" ).length
    let noLeidos = mensajes.filter( m => !m.leido ).length

    return <>
        <Navbar />
        <main>
        <section className="admin">
        <div className="perfil-head">
            <div>
                <span className="eyebrow">Zona privada</span>
                <h2>Panel de Gabriela</h2>
                <p>{ pendientes } { pendientes == 1 ? "pedido pendiente" : "pedidos pendientes" }</p>
            </div>
            <button className="btn-secundario" onClick={cerrarSesion}>Cerrar sesión</button>
        </div>

        <div className="filtros">
            <button className={ pestana == "pedidos" ? "filtro activo" : "filtro" } onClick={ () => setVista( anterior => ({ ...anterior, pestana : "pedidos" }) ) }>
                Pedidos { pendientes > 0 && <b>{ pendientes }</b> }
            </button>
            <button className={ pestana == "mensajes" ? "filtro activo" : "filtro" } onClick={ () => setVista( anterior => ({ ...anterior, pestana : "mensajes" }) ) }>
                Mensajes { noLeidos > 0 && <b>{ noLeidos }</b> }
            </button>
            <button className={ pestana == "catalogo" ? "filtro activo" : "filtro" } onClick={ () => setVista( anterior => ({ ...anterior, pestana : "catalogo" }) ) }>Catálogo</button>
            <button className={ pestana == "cuenta" ? "filtro activo" : "filtro" } onClick={ () => setVista( anterior => ({ ...anterior, pestana : "cuenta" }) ) }>Mi cuenta</button>
        </div>

        {
            pestana == "pedidos"
            ? <>
                <div className="catalogo-sub">
                    <h3>Pedidos</h3>
                    <div className="admin-ver">
                        <button className={ verPedidos == "activos" ? "activo" : "" } onClick={ () => setVista( anterior => ({ ...anterior, verPedidos : "activos" }) ) }>En curso</button>
                        <button className={ verPedidos == "todos" ? "activo" : "" } onClick={ () => setVista( anterior => ({ ...anterior, verPedidos : "todos" }) ) }>Todos</button>
                    </div>
                </div>

                { cargando && <p className="aviso">Cargando pedidos…</p> }
                { !cargando && pedidosVisibles.length == 0 && <p className="aviso">No hay pedidos aquí 🎉</p> }

                <div className="pedidos-lista">
                    {
                        pedidosVisibles.map( pedido => <Pedido key={pedido._id} {...pedido} admin cambiarEstado={cambiarEstado} /> )
                    }
                </div>
            </>
            : pestana == "cuenta"
            ? <EditarPerfil />
            : pestana == "mensajes"
            ? <>
                <div className="catalogo-sub">
                    <h3>Mensajes</h3>
                    <p>{ noLeidos } sin leer</p>
                </div>

                { cargandoMensajes && <p className="aviso">Cargando mensajes…</p> }
                { !cargandoMensajes && mensajes.length == 0 && <p className="aviso">Todavía no hay mensajes 💌</p> }

                <div className="pedidos-lista">
                    {
                        mensajes.map( mensaje => <Mensaje key={mensaje._id} {...mensaje} marcar={marcar} borrar={borrar} /> )
                    }
                </div>
            </>
            : <>
                <p className="admin-sub">Gestiona el catálogo: crea, edita y borra galletas.</p>

                <FormularioGalleta />

                <div className="admin-lista">
                    {
                        galletas.map( ({ _id, ...galleta }) => <GalletaAdmin key={_id} _id={_id} {...galleta} /> )
                    }
                </div>
            </>
        }
    </section>
        </main>
        <Footer />
    </>
}

export default Admin
