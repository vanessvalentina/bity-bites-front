import { useEffect } from "react"
import { Link } from "react-router-dom"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import LogoB from "@/components/LogoB"
import PasoProceso from "@/components/PasoProceso"
import Flecha from "@/components/Flecha"
import { GABRIELA_SALUDO, GABRIELA_INTRO, GABRIELA_PREGUNTA, NY_COOKIE, GABRIELA_PROCESO, INSTAGRAM_URL } from "@/const/constantes"

// Página "Sobre Gabriela": quién hace las galletas y cómo se hacen
function Gabriela(){

    // Al entrar en la página, empezar arriba del todo
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return <>
        <Navbar />
        <main>
            {/* 1. Presentación con su foto */}
            <section className="gabi-hero">
                <div className="gabi-foto">
                    <img src="/gabriela/gabriela.webp" alt="Gabriela, creadora de Bity Bites" />
                    <span className="gabi-sello">
                        <LogoB size={58} />
                    </span>
                </div>

                <div className="gabi-texto">
                    <span className="eyebrow">Sobre Gabriela</span>
                    <p className="gabi-saludo">{ GABRIELA_SALUDO }</p>
                    <h2>Hola, soy <em>Gabriela</em></h2>
                    {
                        GABRIELA_INTRO.map( parrafo => <p key={parrafo}>{ parrafo }</p> )
                    }
                    <Link to="/" className="gabi-pregunta">{ GABRIELA_PREGUNTA } <span>→</span></Link>
                    <p className="gabi-firma">— Gabriela, Bity Bites Cookies</p>
                </div>
            </section>

            {/* 2. Cómo es una New York Cookie: infografía como el post de Gabriela
                 (cookie en el centro, etiquetas alrededor con flechas dibujadas y la "b" de marca de agua) */}
            <section className="ny-cookie fondo-b">
                <div className="ny-cookie-head">
                    <span className="eyebrow">{ NY_COOKIE.antetitulo }</span>
                    <h2><em>{ NY_COOKIE.titulo }</em></h2>
                </div>

                <div className="ny-info">
                    <img className="ny-galleta" src="/render/vainilla.png" alt="NY cookie de vainilla de Bity Bites" />
                    {
                        NY_COOKIE.puntos.map( ({ titulo, texto, posicion }) => <article className={ "ny-punto pos-" + posicion } key={titulo}>
                            <h3>{ titulo }</h3>
                            <p>{ texto }</p>
                            <Flecha />
                        </article> )
                    }
                </div>

                <p className="ny-cierre">{ NY_COOKIE.cierre }</p>
                <Link to="/" className="gabi-pregunta">{ NY_COOKIE.pregunta } <span>→</span></Link>
            </section>

            {/* 3. Making of: del bol a tu mano */}
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
            </section>

            {/* 4. Frase de marca + llamada a la acción */}
            <section className="gabi-frase">
                <img src="/reales/galletas_6.png" alt="Bolsa de Bity Bites al atardecer desde el tren" loading="lazy" />
                <div>
                    <p>Galletas con intención</p>
                    <h2>Conecta con cada mordida</h2>
                    <div className="gabi-cta">
                        <Link to="/" className="btn-primario">Ver las cookies</Link>
                        <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="btn-secundario">@bitybitescookies</a>
                    </div>
                </div>
            </section>
        </main>
        <Footer />
    </>
}

export default Gabriela
