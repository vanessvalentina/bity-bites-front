import { useState, useContext } from "react"
import GalletasContext from "../context/GalletasContext"

function GalletaCard({ _id, nombre, descripcion, sabor, precio, disponible, destacada }){

    let { editarGalleta, eliminarGalleta } = useContext(GalletasContext)
    let [editando, setEditando] = useState(false)
    let [nuevoNombre, setNuevoNombre] = useState(nombre)
    let [nuevoPrecio, setNuevoPrecio] = useState(precio)

    function guardar(){
        editarGalleta(_id, { nombre : nuevoNombre, precio : Number(nuevoPrecio) })
        setEditando(false)
    }

    if(editando){
        return <article className="galleta">
            <input value={nuevoNombre} onChange={ e => setNuevoNombre(e.target.value) } />
            <input type="number" value={nuevoPrecio} onChange={ e => setNuevoPrecio(e.target.value) } />
            <button onClick={guardar}>Guardar</button>
            <button onClick={ () => setEditando(false) }>Cancelar</button>
        </article>
    }

    return <article className="galleta">
        <h3>{ nombre } { destacada ? "⭐" : "" }</h3>
        <p>{ descripcion }</p>
        <p>Sabor: { sabor }</p>
        <p>{ precio } €</p>
        <p>{ disponible ? "Disponible" : "Agotada" }</p>
        <button onClick={ () => setEditando(true) }>Editar</button>
        <button onClick={ () => eliminarGalleta(_id) }>Borrar</button>
    </article>
}

export default GalletaCard