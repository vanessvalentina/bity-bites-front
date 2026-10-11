import { useContext, useState, useEffect } from "react"
import { Link } from "react-router-dom"
import GalletasContext from "@/context/GalletasContext"
import CarritoContext from "@/context/CarritoContext"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { PACK_TRES, ENCARGOS } from "@/const/constantes"

/**
 * Página de Packs: pack de 3 clásicas, "Arma tu caja" y encargos/regalos.
 * @hook     {useContext} GalletasContext: galletas para armar la caja
 * @hook     {useContext} CarritoContext: agregarAlCarrito y agregarVarios
 * @hook     {useState}   pack: cantidad y aviso "¡Añadido!" (agrupados)
 * @hook     {useState}   caja: lista de galletas elegidas con su cantidad
 * @hook     {useState}   cajaAnadida: aviso "¡Caja añadida!"
 * @hook     {useEffect}  ir a #encargos o arriba del todo al entrar
 */
function Packs(){

    let { galletas } = useContext(GalletasContext)
    let { agregarAlCarrito, agregarVarios } = useContext(CarritoContext)
    // Al entrar: si venimos de "Sabores a medida" (/packs#encargos) bajamos a esa parte
    useEffect(() => {
        // FUERA DEL TEMARIO: window.location.hash lee la parte "#encargos" de la URL, y scrollIntoView / scrollTo
        // mueven la página hasta esa sección (o arriba del todo). Sin esto, al cambiar de página con el router
        // la nueva página se abriría a media altura.
        // Hecho con ayuda de IA (Claude). Documentación: https://developer.mozilla.org/es/docs/Web/API/Element/scrollIntoView
        if(window.location.hash == "#encargos"){
            document.getElementById("encargos").scrollIntoView({ behavior: "smooth" })
        } else {
            window.scrollTo(0, 0)
        }
    }, [])

    // ---- Pack de 3 clásicas ----
    // Cantidad elegida del pack y aviso de "¡Añadido!", agrupados en un solo useState
    let [pack, setPack] = useState({ cantidad : 1, anadido : false })

    function anadirPack(){
        agregarAlCarrito(PACK_TRES, pack.cantidad)
        setPack({ cantidad : 1, anadido : true })
        setTimeout(() => setPack( anterior => ({ ...anterior, anadido : false }) ), 1800)
    }

    // ---- Arma tu caja: lista de { _id, nombre, precio, imagen, cantidad } (receta CRUD de clase) ----
    let [caja, setCaja] = useState([])
    let [cajaAnadida, setCajaAnadida] = useState(false)

    function cantidadEnCaja(id){
        // FUERA DEL TEMARIO: .find() (ver App.jsx). Hecho con ayuda de IA (Claude).
        let item = caja.find( item => item._id == id )
        return item ? item.cantidad : 0
    }

    function cambiarEnCaja({ _id, nombre, precio, imagen }, cantidad){
        if(cantidad < 1){
            setCaja( anterior => anterior.filter( item => item._id != _id ) )
        } else if(cantidadEnCaja(_id) > 0){
            setCaja( anterior => anterior.map( item => item._id == _id ? { ...item, cantidad } : item ) )
        } else {
            setCaja( anterior => [...anterior, { _id, nombre, precio, imagen, cantidad }] )
        }
    }

    // FUERA DEL TEMARIO: .reduce() para contar galletas y sumar el total de la caja. Hecho con ayuda de IA (Claude).
    let unidadesCaja = caja.reduce( (suma, item) => suma + item.cantidad, 0 )
    let totalCaja = caja.reduce( (suma, item) => suma + item.precio * item.cantidad, 0 )

    function anadirCaja(){
        agregarVarios(caja)
        setCaja([])
        setCajaAnadida(true)
        setTimeout(() => setCajaAnadida(false), 1800)
    }

    // ---- Encargos ----

    return <>
        <Navbar />
        <main>
        <section className="packs">

        <div className="seccion-head">
            <span className="eyebrow">Para compartir (o no)</span>
            <h2>Nuestros <em>packs</em></h2>
            <p>Llévate el pack de la casa o arma tu caja a tu manera</p>
        </div>

        {/* 1. Pack de 3 clásicas */}
        <div className="pack-destacado">
            <div className="pack-foto">
                <img src="/packs/cajita.webp" alt="Cajita con galletas clásicas de Bity Bites" />
                <span className="pack-sello">Ahorras 0,70 €</span>
            </div>

            <div className="pack-info">
                <span className="mood">El favorito</span>
                <h3>Pack de 3 clásicas</h3>
                <p className="desc">Una de cada: vainilla, chocolate y chocovainilla. El trío perfecto para probarlas todas.</p>

                <div className="pack-trio">
                    <img src="/render/vainilla.png" alt="Vainilla" />
                    <span>+</span>
                    <img src="/render/chocolate.png" alt="Chocolate" />
                    <span>+</span>
                    <img src="/render/chocovainilla.png" alt="Chocovainilla" />
                </div>

                <div className="pack-precio">
                    <span className="precio">5,90 €</span>
                    <s>6,60 €</s>
                </div>

                <div className="cookie-acciones">
                    <div className="stepper-card">
                        <button onClick={ () => setPack( anterior => ({ ...anterior, cantidad : Math.max(1, anterior.cantidad - 1) }) ) } aria-label="menos">−</button>
                        <span>{ pack.cantidad }</span>
                        <button onClick={ () => setPack( anterior => ({ ...anterior, cantidad : anterior.cantidad + 1 }) ) } aria-label="más">+</button>
                    </div>
                    <button className="btn-add" onClick={anadirPack}>{ pack.anadido ? "¡Añadido! ✓" : "Añadir pack" }</button>
                </div>
            </div>
        </div>

        {/* 2. Arma tu caja */}
        <div className="arma-caja">
            <div className="catalogo-sub">
                <h3>Arma tu caja</h3>
                <p>Elige cuántas quieres de cada una</p>
            </div>

            <div className="caja-grid">
                {
                    galletas.map( g => <div className={ cantidadEnCaja(g._id) > 0 ? "caja-item elegida" : "caja-item" } key={g._id}>
                        <img src={ "/" + g.imagen } alt={ g.nombre } />
                        <h4>{ g.nombre }</h4>
                        <span className="caja-precio">{ g.precio.toFixed(2) } €</span>
                        <div className="stepper-card">
                            <button onClick={ () => cambiarEnCaja(g, cantidadEnCaja(g._id) - 1) } aria-label="menos">−</button>
                            <span>{ cantidadEnCaja(g._id) }</span>
                            <button onClick={ () => cambiarEnCaja(g, cantidadEnCaja(g._id) + 1) } aria-label="más">+</button>
                        </div>
                    </div> )
                }
            </div>

            <div className="caja-resumen">
                <span>{ unidadesCaja } { unidadesCaja == 1 ? "galleta" : "galletas" } en tu caja</span>
                <strong>{ totalCaja.toFixed(2) } €</strong>
                <button className="btn-primario" onClick={anadirCaja} disabled={ unidadesCaja == 0 }>
                    { cajaAnadida ? "¡Caja añadida! ✓" : "Añadir caja al combo" }
                </button>
            </div>
        </div>

        {/* 3. Encargos y regalos */}
        <div className="encargos" id="encargos">
            <div className="catalogo-sub">
                <h3>Encargos y regalos <span>✦ a medida</span></h3>
                <p>Sabores especiales, cajas personalizadas y mensajes</p>
            </div>

            <div className="encargos-grid">
                {
                    ENCARGOS.map( e => <article className="encargo" key={e.titulo}>
                        <img src={ "/" + e.foto } alt={ e.titulo } />
                        <div>
                            <h4>{ e.titulo }</h4>
                            <p>{ e.texto }</p>
                        </div>
                    </article> )
                }
            </div>

            <div className="encargos-cta">
                <p>¿Tienes una idea? Gabriela puede hacer sabores y cajas a medida.</p>
                <Link to="/contacto" className="btn-secundario">Pedir un encargo →</Link>
            </div>
        </div>

    </section>
        </main>
        <Footer />
    </>
}

export default Packs
