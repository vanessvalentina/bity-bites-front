import { useContext, useState, useEffect } from "react"
import { Navigate, Link } from "react-router-dom"
import SesionContext from "@/context/SesionContext"
import Pedido from "@/components/Pedido"
import EditarPerfil from "@/components/EditarPerfil"
import useFetch from "@/hooks/useFetch"
import { API_URL } from "@/const/constantes"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

/**
 * Página "Mi cuenta" del cliente: sus pedidos y editar perfil.
 * @hook     {useContext} SesionContext: token, usuario y cerrarSesion
 * @hook     {useState}   pestana: "pedidos" o "editar"
 * @hook     {useFetch}   mis pedidos desde la API (ruta protegida)
 * @hook     {useEffect}  subir arriba del todo al entrar
 */
function Perfil(){

    // Al entrar en la página, empezar arriba del todo (si no, se queda el scroll de la página anterior)
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    let { token, usuario, cerrarSesion } = useContext(SesionContext)
    // "pedidos" o "editar"
    let [pestana, setPestana] = useState("pedidos")

    // Mis pedidos con el hook personalizado (sin sesión no pide nada)
    let { datos : pedidos, cargando } = useFetch(token ? API_URL + "/pedidos/mios" : null, token)

    if(!token){
        return <Navigate to="/login" />
    }

    return <>
        <Navbar />
        <main>
        <section className="perfil">
        <div className="perfil-head">
            <div>
                <span className="eyebrow">Mi cuenta</span>
                <h2>Hola, { usuario.nombre.split(" ")[0] } 🍪</h2>
                <p>{ usuario.email }</p>
            </div>
            <button className="btn-secundario" onClick={cerrarSesion}>Cerrar sesión</button>
        </div>

        <div className="filtros">
            <button className={ pestana == "pedidos" ? "filtro activo" : "filtro" } onClick={ () => setPestana("pedidos") }>Mis pedidos</button>
            <button className={ pestana == "editar" ? "filtro activo" : "filtro" } onClick={ () => setPestana("editar") }>Editar perfil</button>
        </div>

        {
            pestana == "editar"
            ? <EditarPerfil />
            : <>
        <div className="catalogo-sub">
            <h3>Mis pedidos</h3>
            <p>{ pedidos.length } { pedidos.length == 1 ? "pedido" : "pedidos" }</p>
        </div>

        { cargando && <p className="aviso">Buscando tus pedidos…</p> }

        {
            !cargando && pedidos.length == 0 &&
            <div className="perfil-vacio">
                <p>Todavía no has hecho ningún pedido.</p>
                <Link to="/" className="btn-primario">Ver las cookies</Link>
            </div>
        }

        <div className="pedidos-lista">
            {
                pedidos.map( pedido => <Pedido key={pedido._id} {...pedido} /> )
            }
        </div>
            </>
        }
    </section>
        </main>
        <Footer />
    </>
}

export default Perfil
