import { TIPOS_CONTACTO } from "@/const/constantes"

/**
 * Un mensaje del formulario de Contacto en el panel de Gabriela.
 * @prop     {String}    _id          Id del mensaje
 * @prop     {String}    nombre       Quién escribe
 * @prop     {String}    email        Email de contacto
 * @prop     {String}    telefono     Teléfono (opcional)
 * @prop     {String}    tipo         encargo / cumpleanos / empresa / duda
 * @prop     {String}    fechaEvento  Para cuándo lo quiere (opcional)
 * @prop     {String}    mensaje      Texto del mensaje
 * @prop     {Boolean}   leido        Si Gabriela ya lo ha leído
 * @prop     {String}    fecha        Cuándo se recibió
 * @prop     {Function}  marcar       Marca como leído / no leído (viene de Admin)
 * @prop     {Function}  borrar       Borra el mensaje (viene de Admin)
 */
function Mensaje({ _id, nombre, email, telefono, tipo, fechaEvento, mensaje, leido, fecha, marcar, borrar }){

    // FUERA DEL TEMARIO: .find() busca el texto del tipo de consulta. Hecho con ayuda de IA (Claude).
    let tipoInfo = TIPOS_CONTACTO.find( t => t.valor == tipo )

    // FUERA DEL TEMARIO: toLocaleDateString("es-ES") pone la fecha en formato español. Hecho con ayuda de IA (Claude).
    // Documentación: https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString
    let recibido = new Date(fecha).toLocaleDateString("es-ES", { day : "numeric", month : "short" })
    let paraCuando = fechaEvento ? new Date(fechaEvento).toLocaleDateString("es-ES", { day : "numeric", month : "long" }) : null

    return <article className={ leido ? "mensaje leido" : "mensaje" }>
        <header className="pedido-head">
            <div>
                <strong>{ nombre }</strong>
                <span>{ recibido } · { tipoInfo ? tipoInfo.icono + " " + tipoInfo.texto : tipo }</span>
            </div>
            { !leido && <span className="pedido-estado">nuevo</span> }
        </header>

        <p className="pedido-contacto">
            <a href={ "mailto:" + email }>{ email }</a>
            { telefono && <a href={ "tel:" + telefono }>{ telefono }</a> }
            { paraCuando && <b>📅 Para el { paraCuando }</b> }
        </p>

        <p className="mensaje-texto">{ mensaje }</p>

        <div className="admin-acciones">
            <button onClick={ () => marcar(_id, !leido) }>{ leido ? "Marcar como no leído" : "Marcar como leído" }</button>
            <button className="btn-borrar" onClick={ () => borrar(_id) }>Borrar</button>
        </div>
    </article>
}

export default Mensaje
