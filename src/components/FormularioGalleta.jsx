import { useState, useContext } from "react"
import GalletasContext from "@/context/GalletasContext"
import SesionContext from "@/context/SesionContext"
import { crearGalleta } from "@/services/api"

/**
 * Formulario del panel de Gabriela para crear una galleta nueva (Create del CRUD).
 * @hook     {useContext}  GalletasContext: agregarGalleta para añadirla a la lista
 * @hook     {useContext}  SesionContext: token para la petición protegida
 * @hook     {useState}    formulario: nombre, descripción, sabor y precio (agrupados)
 */
function FormularioGalleta(){

    let { agregarGalleta } = useContext(GalletasContext)
    let { token } = useContext(SesionContext)

    // Campos de la galleta nueva agrupados en un solo useState
    let [formulario, setFormulario] = useState({ nombre : "", descripcion : "", sabor : "", precio : "" })
    let { nombre, descripcion, sabor, precio } = formulario

    // Un solo manejador para todos los campos: el atributo "name" del input dice qué dato cambia.
    // FUERA DEL TEMARIO: [name] es una "propiedad calculada" (la clave del objeto sale de una variable).
    // Hecho con ayuda de IA (Claude). Documentación: https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Operators/Object_initializer
    function cambiar(evento){
        let { name, value, type, checked } = evento.target
        setFormulario( anterior => ({ ...anterior, [name] : type == "checkbox" ? checked : value }) )
    }

    function enviar(evento){
        evento.preventDefault()

        let galleta = { nombre, descripcion, sabor, precio : Number(precio), disponible : true }

        crearGalleta(galleta, token)
        .then( ({_id}) => {
            agregarGalleta({ _id, ...galleta })
            setFormulario({ nombre : "", descripcion : "", sabor : "", precio : "" })
        })
    }

    return <form onSubmit={enviar}>
        <input type="text" placeholder="Nombre" name="nombre" value={nombre} onChange={cambiar} />
        <input type="text" placeholder="Descripción" name="descripcion" value={descripcion} onChange={cambiar} />
        <input type="text" placeholder="Sabor" name="sabor" value={sabor} onChange={cambiar} />
        <input type="number" placeholder="Precio" name="precio" value={precio} onChange={cambiar} />
        <button>Crear galleta</button>
    </form>
}

export default FormularioGalleta