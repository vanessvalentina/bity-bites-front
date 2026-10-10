// Componente stateless: una tarjeta del "making of" (recibe las props deconstruidas)
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
