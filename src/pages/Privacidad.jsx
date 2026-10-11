import { useEffect } from "react"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { PRIVACIDAD } from "@/const/constantes"

/**
 * Página de política de privacidad (RGPD): qué datos se recogen y para qué.
 * @hook     {useEffect}  subir arriba del todo al entrar
 */
function Privacidad(){

    // Al entrar en la página, empezar arriba del todo
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return <>
        <Navbar />
        <main>
            <section className="privacidad">
                <span className="eyebrow">Tus datos, con cariño</span>
                <h2>Política de privacidad</h2>
                <p className="privacidad-intro">Te contamos de forma clara qué hacemos con tus datos cuando compras o nos escribes.</p>
                {
                    PRIVACIDAD.map( ({ titulo, texto }) => <article key={titulo}>
                        <h3>{ titulo }</h3>
                        <p>{ texto }</p>
                    </article> )
                }
            </section>
        </main>
        <Footer />
    </>
}

export default Privacidad
