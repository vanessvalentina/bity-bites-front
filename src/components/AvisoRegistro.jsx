import { useState, useEffect, useContext } from "react"
import { Link } from "react-router-dom"
import SesionContext from "@/context/SesionContext"
import LogoB from "@/components/LogoB"

const SEGUNDOS_ESPERA = 8
// Páginas donde NO tiene sentido enseñar el aviso
const RUTAS_SIN_AVISO = ["/login", "/admin", "/perfil"]

// Ventana en el centro que invita a registrarse tras unos segundos navegando.
// Sale una sola vez por visita (se recuerda en sessionStorage) y nunca si ya hay sesión.
function AvisoRegistro(){

    let { usuario } = useContext(SesionContext)
    let [visible, setVisible] = useState(false)

    useEffect(() => {
        // FUERA DEL TEMARIO: sessionStorage funciona igual que localStorage (visto en clase) pero se borra
        // al cerrar la pestaña: así el aviso no vuelve a salir en esta visita. Hecho con ayuda de IA (Claude).
        // Documentación: https://developer.mozilla.org/es/docs/Web/API/Window/sessionStorage
        let yaVisto = sessionStorage.getItem("avisoRegistro") == "visto"

        if(usuario || yaVisto || RUTAS_SIN_AVISO.includes(window.location.pathname)){
            return
        }

        let temporizador = setTimeout(() => setVisible(true), SEGUNDOS_ESPERA * 1000)

        // Cleanup: si se cambia de página antes de tiempo, se cancela el temporizador
        return () => clearTimeout(temporizador)
    }, [usuario])

    function cerrar(){
        sessionStorage.setItem("avisoRegistro", "visto")
        setVisible(false)
    }

    if(!visible){
        return null
    }

    return <div className="aviso-registro-fondo" onClick={cerrar}>
        {/* stopPropagation: un clic dentro de la tarjeta no la cierra (solo el fondo, la X o los botones) */}
        <div className="aviso-registro" onClick={ evento => evento.stopPropagation() } role="dialog" aria-modal="true" aria-labelledby="aviso-titulo">
            <button className="aviso-cerrar" onClick={cerrar} aria-label="Cerrar">✕</button>

            <div className="aviso-imagen">
                <img src="/render/vainilla.png" alt="" />
                <span className="aviso-sello"><LogoB size={46} /></span>
            </div>

            <span className="eyebrow">Cookie club</span>
            <h3 id="aviso-titulo">¿Te unes al club?</h3>
            <p>Crea tu cuenta gratis y guarda tu historial de pedidos para repetir tus favoritas en un clic.</p>

            <div className="aviso-botones">
                <Link to="/login?modo=registro" className="btn-primario" onClick={cerrar}>Crear mi cuenta</Link>
                <button className="aviso-seguir" onClick={cerrar}>Seguir sin cuenta</button>
            </div>
        </div>
    </div>
}

export default AvisoRegistro
