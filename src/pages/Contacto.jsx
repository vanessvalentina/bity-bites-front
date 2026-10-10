import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { crearMensaje, textoError } from "@/services/api"
import { TIPOS_CONTACTO, INSTAGRAM_URL } from "@/const/constantes"

const FORMULARIO_VACIO = { nombre : "", email : "", telefono : "", tipo : "encargo", fecha : "", mensaje : "", privacidad : false }

// Página de Contacto: el mensaje se guarda en MongoDB y Gabriela lo ve en su panel
function Contacto(){

    // Datos del formulario agrupados en un solo useState
    let [formulario, setFormulario] = useState(FORMULARIO_VACIO)
    // Estado del envío agrupado: enviando, error y si ya se envió
    let [envio, setEnvio] = useState({ enviando : false, error : "", enviado : false })

    let { nombre, email, telefono, tipo, fecha, mensaje, privacidad } = formulario
    let { enviando, error, enviado } = envio

    // Al entrar en la página, empezar arriba del todo
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    // Un solo manejador para todos los campos (el atributo "name" dice qué dato cambia).
    // FUERA DEL TEMARIO: [name] es una "propiedad calculada". Hecho con ayuda de IA (Claude).
    // Documentación: https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Operators/Object_initializer
    function cambiar(evento){
        let { name, value, type, checked } = evento.target
        setFormulario( anterior => ({ ...anterior, [name] : type == "checkbox" ? checked : value }) )
    }

    function enviar(evento){
        evento.preventDefault()

        if(!privacidad){
            return setEnvio({ enviando : false, error : "Debes aceptar la política de privacidad", enviado : false })
        }

        setEnvio({ enviando : true, error : "", enviado : false })

        crearMensaje(formulario)
        .then( () => {
            setEnvio({ enviando : false, error : "", enviado : true })
            setFormulario(FORMULARIO_VACIO)
        })
        .catch( texto => setEnvio({ enviando : false, error : textoError(texto), enviado : false }) )
    }

    return <>
        <Navbar />
        <main>
            <section className="contacto">

                {/* Columna izquierda: invitación + otras formas de contactar */}
                <div className="contacto-info">
                    <span className="eyebrow">Contacto</span>
                    <h2>¡Hablemos de <em>cookies</em>!</h2>
                    <p>¿Un cumple, un regalo para tu equipo o un sabor que solo existe en tu cabeza? Cuéntanos tu idea y Gabriela te responde con todo el cariño.</p>

                    <ul className="contacto-tipos">
                        {
                            TIPOS_CONTACTO.map( ({ valor, texto, icono }) => <li key={valor}><span>{ icono }</span>{ texto }</li> )
                        }
                    </ul>

                    <div className="contacto-datos">
                        <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">📸 @bitybitescookies</a>
                        <span>📍 Madrid</span>
                        <span>⏱️ Encargos con unos días de antelación</span>
                    </div>
                </div>

                {/* Columna derecha: formulario (o confirmación si ya se envió) */}
                {
                    enviado
                    ? <div className="contacto-form contacto-ok">
                        <span className="confirmado-icono">💌</span>
                        <h3>¡Mensaje recibido!</h3>
                        <p>Gabriela lo leerá muy pronto y te escribirá a tu email.</p>
                        <div className="contacto-ok-botones">
                            <Link to="/" className="btn-primario">Ver las cookies</Link>
                            <button className="btn-secundario" onClick={ () => setEnvio({ enviando : false, error : "", enviado : false }) }>Enviar otro</button>
                        </div>
                    </div>
                    : <form className="contacto-form checkout" onSubmit={enviar}>
                        <h3>Escríbenos</h3>

                        <div className="contacto-chips">
                            {
                                TIPOS_CONTACTO.map( ({ valor, texto, icono }) => <button type="button" key={valor}
                                    className={ tipo == valor ? "activo" : "" }
                                    onClick={ () => setFormulario( anterior => ({ ...anterior, tipo : valor }) ) }>
                                    { icono } { texto }
                                </button> )
                            }
                        </div>

                        <label>
                            Nombre
                            <input type="text" name="nombre" value={nombre} onChange={cambiar} required autoComplete="name" />
                        </label>
                        <div className="checkout-fila">
                            <label>
                                Email
                                <input type="email" name="email" value={email} onChange={cambiar} required autoComplete="email" />
                            </label>
                            <label>
                                Teléfono (opcional)
                                <input type="tel" name="telefono" value={telefono} onChange={cambiar} autoComplete="tel" />
                            </label>
                        </div>
                        {
                            tipo != "duda" &&
                            <label>
                                ¿Para cuándo? (opcional)
                                <input type="date" name="fecha" value={fecha} onChange={cambiar} />
                            </label>
                        }
                        <label>
                            Mensaje
                            <textarea name="mensaje" rows="5" value={mensaje} onChange={cambiar} required maxLength="1000"
                                placeholder="Cuéntanos qué te gustaría: cuántas cookies, sabores, mensaje personalizado…" />
                        </label>

                        <label className="check">
                            <input type="checkbox" name="privacidad" checked={privacidad} onChange={cambiar} />
                            <span>Acepto que Bity Bites use mis datos solo para responder a este mensaje, según la <Link to="/privacidad" target="_blank">política de privacidad</Link>.</span>
                        </label>

                        { error && <p className="error-form">{ error }</p> }

                        <button className="btn-comprar" disabled={enviando}>{ enviando ? "Enviando…" : "Enviar mensaje" }</button>
                    </form>
                }
            </section>
        </main>
        <Footer />
    </>
}

export default Contacto
