import { useContext } from "react"
import GalletasContext from "@/context/GalletasContext"
import { ESTADOS_PEDIDO } from "@/const/constantes"


// Lo usan el Perfil (cliente) y el panel de Gabriela (admin = true: ve el contacto y cambia el estado)
function Pedido({ _id, fecha, items, total, estado, entrega, direccion, notas, contacto, admin, cambiarEstado }){

    let { galletas } = useContext(GalletasContext)

    // Los pedidos nuevos guardan el nombre; los antiguos (PEC 2) solo el id de la galleta
    function nombreItem(item){
        if(item.nombre) return item.nombre
        // FUERA DEL TEMARIO: .find() busca la galleta por su _id para poner su nombre en los pedidos antiguos.
        // Hecho con ayuda de IA (Claude). Documentación: https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/find
        let galleta = galletas.find( g => g._id == item.galletaId )
        return galleta ? galleta.nombre : "Galleta"
    }

    // FUERA DEL TEMARIO: toLocaleString("es-ES") convierte la fecha de Mongo a formato español (ej. "9 oct, 22:15").
    // Hecho con ayuda de IA (Claude). Documentación: https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleString
    let fechaTexto = new Date(fecha).toLocaleString("es-ES", { day : "numeric", month : "short", hour : "2-digit", minute : "2-digit" })

    return <article className={ "pedido estado-" + estado }>
        <header className="pedido-head">
            <div>
                <strong>Pedido #{ _id.slice(-5).toUpperCase() }</strong>
                <span>{ fechaTexto }</span>
            </div>
            {
                admin
                ? <select className="pedido-estado" value={estado} onChange={ e => cambiarEstado(_id, e.target.value) }>
                    { ESTADOS_PEDIDO.map( e => <option key={e} value={e}>{ e }</option> ) }
                </select>
                : <span className="pedido-estado">{ estado }</span>
            }
        </header>

        {
            admin && contacto &&
            <p className="pedido-contacto">
                <b>{ contacto.nombre }</b>
                { contacto.telefono && <a href={ "tel:" + contacto.telefono }>{ contacto.telefono }</a> }
                { contacto.email && <a href={ "mailto:" + contacto.email }>{ contacto.email }</a> }
            </p>
        }

        <ul className="pedido-items">
            {
                items.map( item => <li key={ item.galletaId || item.pack }>
                    <span>{ item.cantidad } × { nombreItem(item) }</span>
                    { item.precio && <span>{ (item.precio * item.cantidad).toFixed(2) } €</span> }
                </li> )
            }
        </ul>

        <footer className="pedido-pie">
            <span>
                { entrega == "envio" ? "🚚 Envío" : entrega == "recogida" ? "🛍️ Recogida" : "" }
                { direccion && " · " + direccion }
            </span>
            <strong>{ total.toFixed(2) } €</strong>
        </footer>

        { notas && <p className="pedido-notas">“{ notas }”</p> }
    </article>
}

export default Pedido
