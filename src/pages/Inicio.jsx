import { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import GalletasContext from "@/context/GalletasContext"
import CarritoContext from "@/context/CarritoContext"
import GalletaCard from "@/components/GalletaCard"
import LogoB from "@/components/LogoB"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { SECCIONES_CATALOGO, STICKERS_HERO2, PACK_TRES, GABRIELA_PROCESO } from "@/const/constantes"
import PasoProceso from "@/components/PasoProceso"

/**
 * Página de inicio: hero, catálogo con filtro, preview de packs y making of.
 * @hook     {useContext} GalletasContext: galletas, cargando y error
 * @hook     {useContext} CarritoContext: agregarAlCarrito (pack de 3)
 * @hook     {useState}   filtro: "todas" / "clasica" / "especial"
 * @hook     {useState}   packAnadido: aviso "¡Añadido!" del pack
 * @hook     {useEffect}  bajar al catálogo si se llega con /#catalogo
 * @hook     {useEffect}  parallax con el ratón, con cleanup (removeEventListener)
 */
function Inicio(){

    let { galletas, cargando, error } = useContext(GalletasContext)
    let { agregarAlCarrito } = useContext(CarritoContext)

    // Preview de Packs en la home: el pack de 3 se puede añadir aquí mismo
    let [packAnadido, setPackAnadido] = useState(false)

    function anadirPack(){
        agregarAlCarrito(PACK_TRES, 1)
        setPackAnadido(true)
        setTimeout(() => setPackAnadido(false), 1800)
    }

    // Filtro del catálogo: "todas", "clasica" o "especial"
    let [filtro, setFiltro] = useState("todas")

    let seccionesVisibles = SECCIONES_CATALOGO.filter( s => filtro === "todas" || s.categoria === filtro )



    // Si se llega con /#catalogo (desde el navbar o el footer), bajar al catálogo cuando ya ha cargado
    useEffect(() => {
        if(!cargando && window.location.hash == "#catalogo"){
            document.getElementById("catalogo").scrollIntoView({ behavior : "smooth" })
        }
    }, [cargando])

    // Parallax: la imagen del hero reacciona al movimiento del ratón
    // (se busca el elemento con querySelector, como en el JS de clase)
    useEffect(() => {
        function mover(e){
            let x = (e.clientX / window.innerWidth) - 0.5
            let y = (e.clientY / window.innerHeight) - 0.5
            let escena = document.querySelector(".hero2-cookies")
            if(escena){
                escena.style.transform = `translate(${x * 22}px, ${y * 14}px) rotate(${x * 2}deg)`
            }
        }
        window.addEventListener("mousemove", mover)
        // FUERA DEL TEMARIO: la función que devuelve useEffect se ejecuta al salir de la página y quita el
        // evento del ratón. Es imprescindible: si no, cada vez que se vuelve a Inicio se añadiría otro evento más.
        // Hecho con ayuda de IA (Claude). Documentación: https://es.react.dev/reference/react/useEffect
        return () => window.removeEventListener("mousemove", mover)
    }, [])

    return <>
        <Navbar />
        <main>
        {/* HERO (inspirado en las referencias Rollin + Bakerville): tarjeta marrón, titular gordo con
            pastillas de colores y la foto de las cookies montada encima del titular */}
        <section className="hero2">
            <div className="hero2-card">

                <h1 className="hero2-titulo">
                    <span className="hero2-linea">
                        Hello,
                        <span className="pastilla p-rosa">NY style</span>
                    </span>
                    <span className="hero2-linea hero2-grande">
                        Cookie
                        <span className="pastilla p-amarilla">Chunky</span>
                    </span>
                    <span className="hero2-linea hero2-derecha">Lovers!</span>
                </h1>

                <div className="hero2-cuerpo">
                    <div className="hero2-texto">
                        <h2>
                            Cookies gorditas hechas a mano en Valdemoro
                            <span className="pastilla p-fucsia">• Fresh</span>
                        </h2>
                        <p>Una buena cookie puede cambiarte el día… y estamos aquí para probarlo.</p>

                        <div className="hero2-cta">
                            <a href="#catalogo" className="btn-primario">Pedir ahora →</a>
                            <Link to="/packs" className="btn-secundario btn-claro">Arma tu pack</Link>
                        </div>
                    </div>

                    {/* Foto de las cookies sobre un "blob" de color; se mueve con el ratón (parallax) */}
                    <div className="hero2-foto">
                        <div className="hero2-blob"></div>
                        <img className="hero2-cookies" src="/hero/image_hero.webp" alt="Cookies de Bity Bites" />
                        {
                            STICKERS_HERO2.map( s => <img key={s} className={ "stk2 stk2-" + s } src={ "/hero/st_" + s + ".png" } alt="" aria-hidden="true" /> )
                        }
                        <img className="hero2-sello" src="/logo/logo.png" alt="" aria-hidden="true" />
                    </div>
                </div>
            </div>

        </section>

        <section className="catalogo-wrap" id="catalogo">
            <div className="seccion-head">
                <span className="eyebrow">El menú</span>
                <h2>Nuestras <em>cookies</em></h2>
                <p>Elige tus favoritas y arma tu combo</p>
            </div>

            { cargando && <p className="aviso">Horneando el catálogo…</p> }
            { error && <p className="aviso">No pudimos cargar las cookies 😢</p> }

            <div className="filtros">
                <button className={ filtro === "todas" ? "filtro activo" : "filtro" } onClick={ () => setFiltro("todas") }>Todas</button>
                <button className={ filtro === "clasica" ? "filtro activo" : "filtro" } onClick={ () => setFiltro("clasica") }>Clásicas <b>2,20€</b></button>
                <button className={ filtro === "especial" ? "filtro activo" : "filtro" } onClick={ () => setFiltro("especial") }>Especiales rellenas <b>3,80€</b></button>
                <Link to="/packs" className="filtro filtro-pack">Haz tu pack <b>→</b></Link>
            </div>

            {
                seccionesVisibles.map( seccion => <div className="catalogo-seccion" key={seccion.categoria}>
                    <div className="catalogo-sub">
                        <h3>{ seccion.titulo } <span>{ seccion.precio }</span></h3>
                        <p>{ seccion.texto }</p>
                    </div>
                    <div className="catalogo">
                        {
                            galletas
                                .filter( galleta => galleta.categoria === seccion.categoria )
                                .map( galleta => <GalletaCard key={galleta._id} {...galleta} /> )
                        }
                    </div>
                </div> )
            }
        </section>

        <section className="pack-preview">
            <div className="pack-preview-info">
                <span className="eyebrow">Packs</span>
                <h2>Haz tu <em>pack</em></h2>
                <p>Una de cada clásica por <b>5,90 €</b> (ahorras 0,70 €), o arma tu caja con tus favoritas.</p>

                <div className="pack-trio">
                    <img src="/render/vainilla.png" alt="Vainilla" />
                    <span>+</span>
                    <img src="/render/chocolate.png" alt="Chocolate" />
                    <span>+</span>
                    <img src="/render/chocovainilla.png" alt="Chocovainilla" />
                </div>

                <div className="pack-preview-cta">
                    <button className="btn-primario" onClick={anadirPack}>{ packAnadido ? "¡Añadido! ✓" : "Añadir pack de 3 · 5,90 €" }</button>
                    <Link to="/packs" className="btn-secundario">Arma tu caja →</Link>
                </div>
            </div>

            <div className="pack-preview-foto">
                <img src="/packs/caja.webp" alt="Caja de galletas Bity Bites" />
                <span className="pack-sello">Ahorras 0,70 €</span>
            </div>
        </section>

        {/* Making of: el mismo bloque que en "Sobre Gabriela" (se reutiliza el componente PasoProceso) */}
        <section className="gabi-proceso">
            <div className="seccion-head">
                <span className="eyebrow">Making of</span>
                <h2>Del bol a tu <em>mano</em></h2>
                <p>Así nace cada Bity Bite</p>
            </div>
            <div className="pasos">
                {
                    GABRIELA_PROCESO.map( paso => <PasoProceso key={paso.paso} {...paso} /> )
                }
            </div>
            <div className="proceso-cta">
                <Link to="/gabriela" className="btn-secundario">Conoce a Gabriela →</Link>
            </div>
        </section>
        </main>
        <Footer />
    </>
}

export default Inicio
