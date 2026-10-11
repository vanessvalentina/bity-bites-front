import { useContext, useState } from "react"
import GalletasContext from "@/context/GalletasContext"
import SesionContext from "@/context/SesionContext"
import { borrarGalleta } from "@/services/api"

/**
 * Ventana para confirmar el borrado de una galleta (Delete del CRUD), como ModalBorrar.jsx de clase.
 * @prop     {String}    _id          Id de la galleta a borrar
 * @prop     {String}    nombre       Nombre (para el título)
 * @prop     {Function}  setBorrando  Cierra la ventana
 * @hook     {useContext} GalletasContext: eliminarGalleta
 * @hook     {useContext} SesionContext: token
 * @hook     {useState}   error: aviso si la API falla
 */
function ModalBorrar({ _id, nombre, setBorrando }){

    let { eliminarGalleta } = useContext(GalletasContext)
    let { token } = useContext(SesionContext)
    // Si falla el borrado se avisa dentro del modal (nada de alert ni console.log)
    let [error, setError] = useState(false)

    function borrar(){
        borrarGalleta(_id, token)
        .then( () => {
            eliminarGalleta(_id)
            setBorrando(false)
        })
        .catch( () => setError(true) )
    }

    return <div className="modal">
                <div>
                    <h3>¿Borrar "{ nombre }"?</h3>
                    <p>Desaparecerá del catálogo de la tienda.</p>
                    { error && <p className="error-form">No se ha podido borrar. Inténtalo de nuevo.</p> }
                    <div className="modal-botones">
                        <button onClick={ () => setBorrando(false) }>Cancelar</button>
                        <button className="principal borrar" onClick={ borrar }>Borrar</button>
                    </div>
                </div>
            </div>
}

export default ModalBorrar
