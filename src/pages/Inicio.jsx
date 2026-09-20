import { useContext } from "react"
import GalletasContext from "../context/GalletasContext"
import GalletaCard from "../components/GalletaCard"
import FormularioGalleta from "../components/FormularioGalleta"

function Inicio(){

    let { galletas, cargando, error } = useContext(GalletasContext)

    return <>
        <h1>Bity Bites 🍪</h1>

        <FormularioGalleta />

        { cargando && <p>Cargando galletas…</p> }
        { error && <p>Error al cargar las galletas</p> }

        <section>
            {
             galletas.map( ({_id, ...galleta}) => <GalletaCard key={_id} _id={_id} {...galleta} /> )
            }
        </section>
    </>
}

export default Inicio