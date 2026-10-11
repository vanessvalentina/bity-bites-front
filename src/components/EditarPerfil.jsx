import { useState, useContext } from "react"
import SesionContext from "@/context/SesionContext"
import { actualizarPerfil, cambiarPassword, textoError } from "@/services/api"

/**
 * Formularios para editar mis datos y cambiar mi contraseña (cliente en "Mi cuenta" y Gabriela en su panel).
 * @hook     {useContext}  SesionContext: token, usuario y actualizarUsuario
 * @hook     {useState}    datos: nombre, email, teléfono y dirección (agrupados)
 * @hook     {useState}    avisoDatos: mensaje de ok / error del formulario de datos
 * @hook     {useState}    claves: contraseña actual, nueva y repetida (agrupadas)
 * @hook     {useState}    avisoClave: mensaje de ok / error del formulario de contraseña
 */
function EditarPerfil(){

    let { token, usuario, actualizarUsuario } = useContext(SesionContext)

    // Formulario de datos (agrupados) y su aviso
    let [datos, setDatos] = useState({
        nombre : usuario.nombre,
        email : usuario.email,
        telefono : usuario.telefono || "",
        direccion : usuario.direccion || ""
    })
    let [avisoDatos, setAvisoDatos] = useState({ tipo : "", texto : "" })

    // Formulario de contraseña (agrupados) y su aviso
    let [claves, setClaves] = useState({ actual : "", nueva : "", repetir : "" })
    let [avisoClave, setAvisoClave] = useState({ tipo : "", texto : "" })

    // FUERA DEL TEMARIO: [name] es una "propiedad calculada" (la clave sale del atributo name del input).
    // Hecho con ayuda de IA (Claude). Documentación: https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Operators/Object_initializer
    function cambiarDato(evento){
        let { name, value } = evento.target
        setDatos( anterior => ({ ...anterior, [name] : value }) )
    }

    function cambiarClave(evento){
        let { name, value } = evento.target
        setClaves( anterior => ({ ...anterior, [name] : value }) )
    }

    function guardarDatos(evento){
        evento.preventDefault()
        setAvisoDatos({ tipo : "", texto : "" })

        actualizarPerfil(datos, token)
        .then( usuarioNuevo => {
            actualizarUsuario(usuarioNuevo)
            setAvisoDatos({ tipo : "ok", texto : "¡Datos guardados!" })
        })
        .catch( error => setAvisoDatos({ tipo : "error", texto : textoError(error) }) )
    }

    function guardarClave(evento){
        evento.preventDefault()
        setAvisoClave({ tipo : "", texto : "" })

        if(claves.nueva != claves.repetir){
            return setAvisoClave({ tipo : "error", texto : "Las dos contraseñas nuevas no coinciden" })
        }

        cambiarPassword({ actual : claves.actual, nueva : claves.nueva }, token)
        .then( () => {
            setClaves({ actual : "", nueva : "", repetir : "" })
            setAvisoClave({ tipo : "ok", texto : "¡Contraseña cambiada!" })
        })
        .catch( error => setAvisoClave({ tipo : "error", texto : textoError(error) }) )
    }

    return <div className="editar-perfil">
        <form className="checkout perfil-form" onSubmit={guardarDatos}>
            <h3>Mis datos</h3>
            <label>
                Nombre
                <input type="text" name="nombre" value={datos.nombre} onChange={cambiarDato} required autoComplete="name" />
            </label>
            <label>
                Email (con el que entras)
                <input type="email" name="email" value={datos.email} onChange={cambiarDato} required autoComplete="email" />
            </label>
            <div className="checkout-fila">
                <label>
                    Teléfono
                    <input type="tel" name="telefono" value={datos.telefono} onChange={cambiarDato} autoComplete="tel" />
                </label>
                <label>
                    Dirección
                    <input type="text" name="direccion" value={datos.direccion} onChange={cambiarDato} autoComplete="street-address" />
                </label>
            </div>
            { avisoDatos.texto && <p className={ avisoDatos.tipo == "ok" ? "ok-form" : "error-form" }>{ avisoDatos.texto }</p> }
            <button className="btn-comprar">Guardar datos</button>
        </form>

        <form className="checkout perfil-form" onSubmit={guardarClave}>
            <h3>Cambiar contraseña</h3>
            <label>
                Contraseña actual
                <input type="password" name="actual" value={claves.actual} onChange={cambiarClave} required autoComplete="current-password" />
            </label>
            <label>
                Contraseña nueva
                <input type="password" name="nueva" value={claves.nueva} onChange={cambiarClave} required minLength="8" autoComplete="new-password" placeholder="Mínimo 8 caracteres" />
            </label>
            <label>
                Repite la contraseña nueva
                <input type="password" name="repetir" value={claves.repetir} onChange={cambiarClave} required minLength="8" autoComplete="new-password" />
            </label>
            { avisoClave.texto && <p className={ avisoClave.tipo == "ok" ? "ok-form" : "error-form" }>{ avisoClave.texto }</p> }
            <button className="btn-comprar">Cambiar contraseña</button>
        </form>
    </div>
}

export default EditarPerfil
