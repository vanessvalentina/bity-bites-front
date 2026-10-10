import { useContext } from "react"
import GalletasContext from "@/context/GalletasContext"
import SesionContext from "@/context/SesionContext"
import { borrarGalleta } from "@/services/api"

// Como ModalBorrar.jsx de clase (colores-react): pide confirmación antes de borrar
function ModalBorrar({ _id, nombre, setBorrando }){

    let { eliminarGalleta } = useContext(GalletasContext)
    let { token } = useContext(SesionContext)

    function borrar(){
        borrarGalleta(_id, token)
        .then( () => {
            eliminarGalleta(_id)
            setBorrando(false)
        })
        .catch( e => console.log(e) )
    }

    return <div className="modal">
                <div>
                    <h3>¿Borrar "{ nombre }"?</h3>
                    <p>Desaparecerá del catálogo de la tienda.</p>
                    <div className="modal-botones">
                        <button onClick={ () => setBorrando(false) }>Cancelar</button>
                        <button className="principal borrar" onClick={ borrar }>Borrar</button>
                    </div>
                </div>
            </div>
}

export default ModalBorrar
