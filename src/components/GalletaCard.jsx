import { useState, useContext } from "react"
import CarritoContext from "@/context/CarritoContext"

/**
 * Tarjeta de una galleta del catálogo con selector de cantidad y botón "Añadir" al carrito.
 * @prop     {String}   _id          Id de la galleta
 * @prop     {String}   nombre       Nombre
 * @prop     {String}   descripcion  Descripción sensorial
 * @prop     {Number}   precio       Precio en euros
 * @prop     {String}   imagen       Ruta de la foto (render sin fondo)
 * @prop     {String}   mood         Mood de la galleta (Cozy, Intenso…)
 * @prop     {String}   categoria    "clasica" o "especial"
 * @prop     {Boolean}  disponible   Si se puede comprar
 * @hook     {useContext} CarritoContext: agregarAlCarrito
 * @hook     {useState}   imgError: si la foto no carga se enseña un icono
 * @hook     {useState}   cantidad: unidades elegidas antes de añadir
 */
function GalletaCard({ _id, nombre, descripcion, precio, imagen, mood, categoria, disponible }){

    let { agregarAlCarrito } = useContext(CarritoContext)
    let [imgError, setImgError] = useState(false)
    let [cantidad, setCantidad] = useState(1)

    let foto = imagen ? "/" + imagen : null

    // FUERA DEL TEMARIO: .toFixed(2) muestra siempre 2 decimales en el precio (2.20 € en vez de 2.2 €).
    // Hecho con ayuda de IA (Claude). Documentación: https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Number/toFixed
    // .replace(".", ",") pone la coma decimal española: 2.20 -> 2,20
    let precioTexto = precio.toFixed(2).replace(".", ",") + " €"

    function anadir(){
        agregarAlCarrito({ _id, nombre, precio, imagen }, cantidad)
        setCantidad(1)
    }

    return <article className="cookie-card">
        { categoria === "especial" && <span className="badge-especial">Rellena ✦</span> }

        <div className="cookie-media">
            {
                foto && !imgError
                ? <img className="cookie-img" src={foto} alt={nombre} onError={ () => setImgError(true) } />
                : <div className="cookie-placeholder">🍪</div>
            }
        </div>

        <div className="cookie-info">
            { mood && <span className="mood">♪ { mood }</span> }
            <h3>{ nombre }</h3>
            <p className="desc">{ descripcion }</p>

            <div className="cookie-pie">
            <span className="precio">{ precioTexto }</span>
            {
                disponible
                ? <div className="cookie-acciones">
                    <div className="stepper-card">
                        <button onClick={ () => setCantidad( anterior => Math.max(1, anterior - 1) ) } aria-label="menos">−</button>
                        <span>{ cantidad }</span>
                        <button onClick={ () => setCantidad( anterior => anterior + 1 ) } aria-label="más">+</button>
                    </div>
                    <button className="btn-add" onClick={anadir}>Añadir</button>
                </div>
                : <button className="btn-add agotada" disabled>Agotada</button>
            }
            </div>
        </div>
    </article>
}

export default GalletaCard
