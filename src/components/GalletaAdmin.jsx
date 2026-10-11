import { useState } from "react"
import ModalEditar from "@/components/ModalEditar"
import ModalBorrar from "@/components/ModalBorrar"

/**
 * Una galleta en la lista del panel de Gabriela, con sus botones de editar y borrar (como Color.jsx de clase).
 * @prop     {String}   _id          Id de la galleta en MongoDB
 * @prop     {String}   nombre       Nombre de la galleta
 * @prop     {String}   descripcion  Descripción
 * @prop     {String}   sabor        Sabor
 * @prop     {Number}   precio       Precio en euros
 * @prop     {Boolean}  disponible   Si está a la venta
 * @prop     {String}   playlistUrl  Enlace a su playlist de Spotify
 * @hook     {useState} editando: abre el ModalEditar
 * @hook     {useState} borrando: abre el ModalBorrar
 */
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
