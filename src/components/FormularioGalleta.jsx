import { useState, useContext } from "react"
import GalletasContext from "../context/GalletasContext"
import { crearGalleta } from "../services/api"

function FormularioGalleta(){

    let { agregarGalleta } = useContext(GalletasContext)

    let [nombre, setNombre] = useState("")
    let [descripcion, setDescripcion] = useState("")
    let [sabor, setSabor] = useState("")
    let [precio, setPrecio] = useState("")

    function enviar(evento){
        evento.preventDefault()

        let galleta = { nombre, descripcion, sabor, precio : Number(precio), disponible : true }

                crearGalleta(galleta)
        .then( ({_id}) => {
            agregarGalleta({ _id, ...galleta })
            setNombre("")
            setDescripcion("")
            setSabor("")
            setPrecio("")
        })
    }

    return <form onSubmit={enviar}>
        <input type="text" placeholder="Nombre" value={nombre} onChange={ e => setNombre(e.target.value) } />
        <input type="text" placeholder="Descripción" value={descripcion} onChange={ e => setDescripcion(e.target.value) } />
        <input type="text" placeholder="Sabor" value={sabor} onChange={ e => setSabor(e.target.value) } />
        <input type="number" placeholder="Precio" value={precio} onChange={ e => setPrecio(e.target.value) } />
        <button>Crear galleta</button>
    </form>
}

export default FormularioGalleta