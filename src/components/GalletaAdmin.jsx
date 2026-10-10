import { useState } from "react"
import ModalEditar from "@/components/ModalEditar"
import ModalBorrar from "@/components/ModalBorrar"

// Como Color.jsx de clase: cada galleta con sus botones y sus modales de editar/borrar
function GalletaAdmin({ _id, nombre, descripcion, sabor, precio, disponible, playlistUrl }){

    let [editando, setEditando] = useState(false)
    let [borrando, setBorrando] = useState(false)

    return <>
            <article className="admin-galleta">
                <div className="admin-info">
                    <strong>{ nombre }</strong>
                    <span>{ sabor } · { precio.toFixed(2) } € · { disponible ? "Disponible" : "Agotada" } · { playlistUrl ? "🎵 con playlist" : "sin playlist" }</span>
                </div>
                <div className="admin-acciones">
                    <button onClick={ () => setEditando(true) }>Editar</button>
                    <button className="btn-borrar" onClick={ () => setBorrando(true) }>Borrar</button>
                </div>
            </article>
            {
                editando ? <ModalEditar setEditando={setEditando} _id={_id} nombre={nombre} descripcion={descripcion} precio={precio} disponible={disponible} playlistUrl={playlistUrl} /> : null
            }
            {
                borrando ? <ModalBorrar setBorrando={setBorrando} _id={_id} nombre={nombre} /> : null
            }
            </>
}

export default GalletaAdmin
