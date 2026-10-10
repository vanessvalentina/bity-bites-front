import { useState, useContext } from "react"
import GalletasContext from "@/context/GalletasContext"
import SesionContext from "@/context/SesionContext"
import { actualizarGalleta } from "@/services/api"

// Como ModalEditar.jsx de clase (colores-react)
function ModalEditar({ _id, nombre, descripcion, precio, disponible, playlistUrl = "", setEditando }){

    let { editarGalleta } = useContext(GalletasContext)
    let { token } = useContext(SesionContext)

    // Los datos de la galleta que se editan, agrupados en un solo useState
    let [formulario, setFormulario] = useState({ nombre, descripcion, precio, disponible, playlistUrl })
    let [error, setError] = useState(false)

    // Un solo manejador para todos los campos: el atributo "name" del input dice qué dato cambia.
    // FUERA DEL TEMARIO: [name] es una "propiedad calculada" (la clave del objeto sale de una variable).
    // Hecho con ayuda de IA (Claude). Documentación: https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Operators/Object_initializer
    function cambiar(evento){
        let { name, value, type, checked } = evento.target
        setFormulario( anterior => ({ ...anterior, [name] : type == "checkbox" ? checked : value }) )
    }

    function guardar(){

        setError(false)

        let precioValido = /^[0-9]{1,2}(\.[0-9]{1,2})?$/.test(formulario.precio) && Number(formulario.precio) > 0

        // la playlist es opcional; si se escribe, tiene que ser un enlace de Spotify
        let playlistValida = formulario.playlistUrl == "" || /^https:\/\/open\.spotify\.com\/playlist\//.test(formulario.playlistUrl)

        if(formulario.nombre.trim() == "" || !precioValido || !playlistValida){
            return setError(true)
        }

        if(formulario.nombre != nombre || formulario.descripcion != descripcion || Number(formulario.precio) != precio || formulario.disponible != disponible || formulario.playlistUrl != playlistUrl){

            let cambios = {
                nombre : formulario.nombre,
                descripcion : formulario.descripcion,
                precio : Number(formulario.precio),
                disponible : formulario.disponible,
                // se guarda el enlace limpio, sin el "?si=..." que añade Spotify al compartir
                playlistUrl : formulario.playlistUrl.split("?")[0]
            }

            return actualizarGalleta(_id, cambios, token)
                .then( () => {
                    editarGalleta(_id, cambios)
                    setEditando(false)
                })
                .catch( () => setError(true) )
        }

        setEditando(false)
    }

    return <div className="modal">
                <div>
                    <h3>Editar galleta</h3>
                    <label>Nombre <input type="text" name="nombre" value={formulario.nombre} onChange={cambiar} /></label>
                    <label>Descripción <textarea rows="3" name="descripcion" value={formulario.descripcion} onChange={cambiar} /></label>
                    <label>Precio (€) <input type="text" name="precio" value={formulario.precio} onChange={cambiar} /></label>
                    <label>Playlist de Spotify (opcional) <input type="text" name="playlistUrl" value={formulario.playlistUrl} onChange={cambiar} placeholder="https://open.spotify.com/playlist/..." /></label>
                    <label className="check"><input type="checkbox" name="disponible" checked={formulario.disponible} onChange={cambiar} /> Disponible</label>
                    {
                        error ?
                        <p className="error-form">Revisa el nombre, el precio (ej. 2.20) y que la playlist sea un enlace de Spotify</p>
                        :
                        null
                    }
                    <div className="modal-botones">
                        <button onClick={ () => setEditando(false) }>Cancelar</button>
                        <button className="principal" onClick={ guardar }>Guardar</button>
                    </div>
                </div>
            </div>
}

export default ModalEditar
