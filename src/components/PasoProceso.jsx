/**
 * Componente stateless: una tarjeta del "making of" (del bol a tu mano).
 * @prop     {Number}  paso    Número del paso
 * @prop     {String}  titulo  Título del paso
 * @prop     {String}  texto   Explicación
 * @prop     {String}  foto    Ruta de la foto real
 */
function PasoProceso({ paso, titulo, texto, foto }){
    return <article className="paso">
        <div className="paso-foto">
            <img src={ "/" + foto } alt={titulo} loading="lazy" />
            <span className="paso-num">{ paso }</span>
        </div>
        <h4>{ titulo }</h4>
        <p>{ texto }</p>
    </article>
}

export default PasoProceso
