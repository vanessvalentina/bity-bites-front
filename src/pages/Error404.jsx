import { useEffect } from "react"
import { Link } from "react-router-dom"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import LogoB from "@/components/LogoB"

/**
 * Página para rutas que no existen (errorElement del router, como en clase).
 * @hook     {useEffect}  subir arriba del todo al entrar
 */
function Error404(){
    // Al entrar en la página, empezar arriba del todo (si no, se queda el scroll de la página anterior)
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return <>
        <Navbar />
        <main>
            <section className="placeholder">
                <LogoB size={72} />
                <h2>404 · Esta galleta no existe</h2>
                <p>La página que buscas se la ha comido alguien 🍪</p>
                <Link to="/" className="btn-primario">Volver al inicio</Link>
            </section>
        </main>
        <Footer />
    </>
}

export default Error404
