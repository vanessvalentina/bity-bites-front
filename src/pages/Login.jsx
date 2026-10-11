import { useState, useContext, useEffect } from "react"
import { Navigate, Link } from "react-router-dom"
import SesionContext from "@/context/SesionContext"
import CarritoContext from "@/context/CarritoContext"
import LogoB from "@/components/LogoB"
import { login, registro, textoError } from "@/services/api"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

/**
 * Página de login y registro (contraseñas con bcrypt en la API).
 * @hook     {useContext} SesionContext: token, usuario e iniciarSesion
 * @hook     {useContext} CarritoContext: si hay carrito, volver a él tras entrar
 * @hook     {useState}   modo: "entrar" o "registro"
 * @hook     {useState}   envio: enviando y error (agrupados)
 * @hook     {useState}   formulario: nombre, email, contraseña y privacidad (agrupados)
 * @hook     {useEffect}  subir arriba del todo al entrar
 */
function Login(){

    // Al entrar en la página, empezar arriba del todo (si no, se queda el scroll de la página anterior)
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    let { token, usuario, iniciarSesion } = useContext(SesionContext)
    let { carrito } = useContext(CarritoContext)

    // "entrar" o "registro"
    // Si se llega desde el aviso "¿Te unes al club?" (/login?modo=registro), se abre directamente en Registrarme
    let [modo, setModo] = useState( window.location.search.includes("modo=registro") ? "registro" : "entrar" )
    // Estado del envío (relacionados): si se está enviando y el mensaje de error
    let [envio, setEnvio] = useState({ enviando : false, error : "" })
    // Datos del formulario agrupados en un solo useState (usuario / contraseña…)
    let [formulario, setFormulario] = useState({ nombre : "", email : "", password : "", privacidad : false })
    let { nombre, email, password, privacidad } = formulario
    let { enviando, error } = envio

    // Ya hay sesión -> Gabriela va a su panel; el cliente vuelve al carrito si tenía algo, si no a su perfil
    if(token){
        if(usuario.rol == "admin"){
            return <Navigate to="/admin" />
        }
        return <Navigate to={ carrito.length > 0 ? "/carrito" : "/perfil" } />
    }

    // Un solo manejador para todos los campos: el atributo "name" del input dice qué dato cambia.
    // FUERA DEL TEMARIO: [name] es una "propiedad calculada" (la clave del objeto sale de una variable).
    // Hecho con ayuda de IA (Claude). Documentación: https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Operators/Object_initializer
    function cambiar(evento){
        let { name, value, type, checked } = evento.target
        setFormulario( anterior => ({ ...anterior, [name] : type == "checkbox" ? checked : value }) )
    }

    function enviar(evento){
        evento.preventDefault()
        setEnvio({ enviando : false, error : "" })

        if(modo == "registro" && password.length < 8){
            return setEnvio({ enviando : false, error : "La contraseña debe tener al menos 8 caracteres" })
        }
        if(modo == "registro" && !privacidad){
            return setEnvio({ enviando : false, error : "Debes aceptar la política de privacidad" })
        }

        setEnvio({ enviando : true, error : "" })

        let peticion = modo == "entrar"
            ? login({ email, password })
            : registro({ nombre, email, password, privacidad })

        peticion
        .then( datos => iniciarSesion(datos) )
        .catch( mensaje => setEnvio({ enviando : false, error : textoError(mensaje) }) )
    }

    function cambiarModo(nuevo){
        setModo(nuevo)
        setEnvio({ enviando : false, error : "" })
    }

    return <>
        <Navbar />
        <main>
        <section className="login">
        <div className="login-card">
            <LogoB size={64} />
            <h2>{ modo == "entrar" ? "Hola de nuevo" : "Crea tu cuenta" }</h2>
            <p className="login-sub">
                { modo == "entrar" ? "Entra para ver tus pedidos" : "Guarda tu historial de pedidos y pide más rápido" }
            </p>

            <div className="login-tabs">
                <button className={ modo == "entrar" ? "activo" : "" } onClick={ () => cambiarModo("entrar") }>Entrar</button>
                <button className={ modo == "registro" ? "activo" : "" } onClick={ () => cambiarModo("registro") }>Registrarme</button>
            </div>

            <form onSubmit={enviar}>
                {
                    modo == "registro" &&
                    <label>
                        Nombre
                        <input type="text" name="nombre" value={nombre} onChange={cambiar} required autoComplete="name" />
                    </label>
                }
                <label>
                    Email
                    <input type="email" name="email" value={email} onChange={cambiar} required autoComplete="email" />
                </label>
                <label>
                    Contraseña
                    <input type="password" name="password" value={password} onChange={cambiar} required
                        autoComplete={ modo == "entrar" ? "current-password" : "new-password" }
                        placeholder={ modo == "registro" ? "Mínimo 8 caracteres" : "" } />
                </label>

                {
                    modo == "registro" &&
                    <label className="check">
                        <input type="checkbox" name="privacidad" checked={privacidad} onChange={cambiar} />
                        <span>Acepto que Bity Bites guarde mis datos para gestionar mis pedidos, según la <Link to="/privacidad" target="_blank">política de privacidad</Link>.</span>
                    </label>
                }

                { error && <p className="error-form">{ error }</p> }

                <button className="btn-comprar" disabled={enviando}>
                    { enviando ? "Un momento…" : modo == "entrar" ? "Entrar" : "Crear cuenta" }
                </button>
            </form>

            <Link to="/carrito" className="login-invitado">Seguir sin cuenta →</Link>
        </div>
    </section>
        </main>
        <Footer />
    </>
}

export default Login
