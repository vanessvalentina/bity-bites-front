import { Link } from "react-router-dom"
import LogoB from "@/components/LogoB"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

function Placeholder({ titulo }){
    return <>
        <Navbar />
        <main>
        <section className="placeholder">
        <LogoB size={72} />
        <h2>{ titulo }</h2>
        <p>Esta sección está en el horno… 🍪 ¡vuelve pronto!</p>
        <Link to="/" className="btn-primario">Volver al inicio</Link>
    </section>
        </main>
        <Footer />
    </>
}

export default Placeholder
