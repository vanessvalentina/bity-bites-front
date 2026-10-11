import { Link } from "react-router-dom"
import LogoB from "@/components/LogoB"
import { CONTACTO_TIENDA, ENLACES_FOOTER, INSTAGRAM_URL } from "@/const/constantes"

/**
 * Footer (stateless): contacto rápido (móvil, Instagram, playlist, dirección) y resumen de secciones.
 * Los datos salen de las constantes CONTACTO_TIENDA y ENLACES_FOOTER.
 */
function Footer(){

    let { telefono, instagram, direccion, playlist } = CONTACTO_TIENDA

    return <footer className="footer">

        {/* 1. Contacto rápido */}
        <section className="footer-contacto">
            <div className="footer-contacto-texto">
                <span className="eyebrow">Contacto</span>
                <h2>¿Se te antoja una cookie?</h2>
                <p>Escríbenos, pásate por Instagram o ponle música a tu próxima mordida.</p>
            </div>

            <div className="footer-tarjetas">
                {
                    telefono &&
                    <a className="footer-tarjeta" href={ "tel:" + telefono }>
                        <span>📱</span>
                        <small>Llámanos o escríbenos</small>
                        <b>{ telefono }</b>
                    </a>
                }
                <a className="footer-tarjeta" href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">
                    <span>📸</span>
                    <small>Instagram</small>
                    <b>{ instagram }</b>
                </a>
                <Link className="footer-tarjeta" to={playlist}>
                    <span>🎵</span>
                    <small>Nuestra playlist</small>
                    <b>Conecta con cada mordida</b>
                </Link>
                <div className="footer-tarjeta">
                    <span>📍</span>
                    <small>Dónde estamos</small>
                    <b>{ direccion }</b>
                </div>
            </div>
        </section>

        {/* 2. Resumen de secciones */}
        <div className="footer-mapa">
            <div className="footer-marca">
                <Link to="/" className="marca">
                    <LogoB size={44} />
                    <span>bity bites</span>
                </Link>
                <p>Galletas con intención · NY cookies hechas a mano en Valdemoro (Madrid).</p>
            </div>

            {
                ENLACES_FOOTER.map( ({ titulo, enlaces }) => <nav className="footer-columna" key={titulo}>
                    <h4>{ titulo }</h4>
                    {
                        // Enlaces con "#" (ancla dentro de una página) van con <a> normal; el resto con <Link> del router
                        enlaces.map( ({ texto, ruta }) => ruta.includes("#")
                            ? <a key={ruta} href={ruta}>{ texto }</a>
                            : <Link key={ruta} to={ruta}>{ texto }</Link> )
                    }
                </nav> )
            }
        </div>

        {/* 3. Línea final */}
        <div className="footer-pie">
            <span>© 2026 Bity Bites Cookies</span>
            <span>Hecho con amor y chocolate 🍪</span>
        </div>
    </footer>
}

export default Footer
