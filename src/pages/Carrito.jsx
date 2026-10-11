import { useState, useContext, useEffect } from "react"
import { Link } from "react-router-dom"
import CarritoContext from "@/context/CarritoContext"
import SesionContext from "@/context/SesionContext"
import { crearPedido, textoError } from "@/services/api"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

/**
 * Página "Tu combo": carrito + formulario para hacer el pedido (invitado o con cuenta).
 * @hook     {useContext} CarritoContext: carrito y funciones para cambiarlo
 * @hook     {useContext} SesionContext: token y datos del usuario para rellenar el formulario
 * @hook     {useState}   formulario: datos del pedido (agrupados)
 * @hook     {useState}   envio: enviando, error y pedido confirmado (agrupados)
 * @hook     {useEffect}  subir arriba del todo al entrar
 */
function Carrito(){

    // Al entrar en la página, empezar arriba del todo (si no, se queda el scroll de la página anterior)
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    let { carrito, cambiarCantidad, quitarDelCarrito, vaciarCarrito } = useContext(CarritoContext)
    let { token, usuario } = useContext(SesionContext)

    // Datos del pedido (si hay sesión, vienen rellenos con los del usuario)
    let [formulario, setFormulario] = useState({
        nombre : usuario ? usuario.nombre : "",
        email : usuario ? usuario.email : "",
        telefono : usuario && usuario.telefono ? usuario.telefono : "",
        entrega : "recogida",
        direccion : usuario && usuario.direccion ? usuario.direccion : "",
        notas : "",
        privacidad : false
    })
    let { nombre, email, telefono, entrega, direccion, notas, privacidad } = formulario

    // Estado del envío agrupado: enviando, mensaje de error y el pedido confirmado ({ _id, total })
    let [envio, setEnvio] = useState({ enviando : false, error : "", confirmado : null })
    let { enviando, error, confirmado } = envio

    // FUERA DEL TEMARIO: .reduce() para sumar precio × cantidad de cada línea del carrito.
    // Hecho con ayuda de IA (Claude). Documentación: https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce
    let total = carrito.reduce( (suma, item) => suma + item.precio * item.cantidad, 0 )

    // Un solo manejador para todos los campos: el atributo "name" del input dice qué dato cambia.
    // FUERA DEL TEMARIO: [name] es una "propiedad calculada" (la clave del objeto sale de una variable).
    // Hecho con ayuda de IA (Claude). Documentación: https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Operators/Object_initializer
    function cambiar(evento){
        let { name, value, type, checked } = evento.target
        setFormulario( anterior => ({ ...anterior, [name] : type == "checkbox" ? checked : value }) )
    }

    function comprar(evento){
        evento.preventDefault()
        setEnvio({ enviando : false, error : "", confirmado : null })

        if(!email && !telefono){
            return setEnvio({ enviando : false, error : "Déjanos un email o un teléfono para avisarte", confirmado : null })
        }
        if(!token && !privacidad){
            return setEnvio({ enviando : false, error : "Debes aceptar la política de privacidad", confirmado : null })
        }

        setEnvio({ enviando : true, error : "", confirmado : null })

        // Solo mandamos id + cantidad: el precio lo pone la API desde la base de datos
        let pedido = {
            items : carrito.map( ({ _id, cantidad }) => ({ _id, cantidad }) ),
            contacto : { nombre, email, telefono },
            entrega,
            direccion,
            notas,
            privacidad
        }

        crearPedido(pedido, token)
        .then( datos => {
            setEnvio({ enviando : false, error : "", confirmado : datos })
            vaciarCarrito()
        })
        .catch( mensaje => setEnvio({ enviando : false, error : textoError(mensaje), confirmado : null }) )
    }

    if(confirmado){
        return <>
        <Navbar />
        <main>
        <section className="carrito confirmado">
            <span className="confirmado-icono">🍪</span>
            <h2>¡Pedido recibido!</h2>
            <p>Pedido <b>#{ confirmado._id.slice(-5).toUpperCase() }</b> · { confirmado.total.toFixed(2) } €</p>
            <p className="carrito-vacio">Gabriela ya lo tiene. Te avisará para confirmar { entrega == "envio" ? "el envío" : "la recogida" } y el pago.</p>
            {
                token
                ? <Link to="/perfil" className="btn-primario">Ver mis pedidos</Link>
                : <Link to="/" className="btn-primario">Volver a la tienda</Link>
            }
        </section>
        </main>
        <Footer />
    </>
    }

    if(carrito.length == 0){
        return <>
        <Navbar />
        <main>
        <section className="carrito">
            <h2>Tu combo</h2>
            <p className="carrito-vacio">Tu combo está vacío 🍪</p>
            <Link to="/" className="btn-seguir">Ver galletas</Link>
        </section>
        </main>
        <Footer />
    </>
    }

    return <>
        <Navbar />
        <main>
        <section className="carrito">
        <h2>Tu combo</h2>

        <div className="carrito-items">
            {
                carrito.map( item => <div className="carrito-item" key={item._id}>
                    <span className="item-nombre">{ item.nombre }</span>

                    <div className="stepper">
                        <button onClick={ () => cambiarCantidad(item._id, item.cantidad - 1) }>−</button>
                        <span>{ item.cantidad }</span>
                        <button onClick={ () => cambiarCantidad(item._id, item.cantidad + 1) }>+</button>
                    </div>

                    <span className="item-subtotal">{ (item.precio * item.cantidad).toFixed(2) } €</span>
                    <button className="item-quitar" onClick={ () => quitarDelCarrito(item._id) }>Quitar</button>
                </div> )
            }
        </div>

        <div className="carrito-total">
            <span>Total</span>
            <strong>{ total.toFixed(2) } €</strong>
        </div>

        {
            !token &&
            <div className="aviso-cuenta">
                <p><b>¿Tienes cuenta?</b> Entra para guardar este pedido en tu historial. También puedes pedir sin cuenta.</p>
                <Link to="/login">Entrar o registrarme</Link>
            </div>
        }

        <form className="checkout" onSubmit={comprar}>
            <h3>Tus datos</h3>

            <label>
                Nombre
                <input type="text" name="nombre" value={nombre} onChange={cambiar} required autoComplete="name" />
            </label>
            <div className="checkout-fila">
                <label>
                    Email
                    <input type="email" name="email" value={email} onChange={cambiar} autoComplete="email" />
                </label>
                <label>
                    Teléfono
                    <input type="tel" name="telefono" value={telefono} onChange={cambiar} autoComplete="tel" />
                </label>
            </div>

            <div className="checkout-entrega">
                <button type="button" className={ entrega == "recogida" ? "activo" : "" } onClick={ () => setFormulario( anterior => ({ ...anterior, entrega : "recogida" }) ) }>🛍️ Recogida</button>
                <button type="button" className={ entrega == "envio" ? "activo" : "" } onClick={ () => setFormulario( anterior => ({ ...anterior, entrega : "envio" }) ) }>🚚 Envío</button>
            </div>

            {
                entrega == "envio" &&
                <label>
                    Dirección de envío
                    <input type="text" name="direccion" value={direccion} onChange={cambiar} required autoComplete="street-address" />
                </label>
            }

            <label>
                Notas (opcional)
                <textarea rows="2" name="notas" value={notas} onChange={cambiar} placeholder="Alergias, mensaje para regalo, hora preferida…" />
            </label>

            {
                !token &&
                <label className="check">
                    <input type="checkbox" name="privacidad" checked={privacidad} onChange={cambiar} />
                    <span>Acepto que Bity Bites use estos datos solo para gestionar mi pedido, según la <Link to="/privacidad" target="_blank">política de privacidad</Link>.</span>
                </label>
            }

            { error && <p className="error-form">{ error }</p> }

            <p className="checkout-pago">El pago se acuerda con Gabriela al confirmar el pedido.</p>

            <div className="carrito-acciones">
                <button className="btn-comprar" disabled={enviando}>{ enviando ? "Enviando…" : "Hacer pedido" }</button>
                <button type="button" className="btn-vaciar" onClick={vaciarCarrito}>Vaciar combo</button>
            </div>
        </form>
    </section>
        </main>
        <Footer />
    </>
}

export default Carrito
