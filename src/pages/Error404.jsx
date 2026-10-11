import { Link } from "react-router-dom"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import LogoB from "@/components/LogoB"

/**
 * Página para rutas que no existen (errorElement del router, como en clase).
 */
function Error404(){
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
