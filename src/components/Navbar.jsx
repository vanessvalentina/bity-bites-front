import { useContext, useState, useEffect } from "react"
import { Link } from "react-router-dom"
import CarritoContext from "@/context/CarritoContext"
import SesionContext from "@/context/SesionContext"
import LogoB from "@/components/LogoB"
import IconoCarrito from "@/components/IconoCarrito"
import AvisoRegistro from "@/components/AvisoRegistro"
import { NAV_ENLACES } from "@/const/constantes"

// Navbar de cristal (glass) con megamenú: al pasar el ratón por una sección se ve una vista previa
function Navbar(){

    let { carrito } = useContext(CarritoContext)
    let { usuario } = useContext(SesionContext)
    // FUERA DEL TEMARIO: .reduce() recorre la lista acumulando un resultado (aquí, el total de unidades).
    // Hecho con ayuda de IA (Claude). Documentación: https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce
    let totalUnidades = carrito.reduce( (suma, item) => suma + item.cantidad, 0 )

    // Menú del móvil (☰): abierto o cerrado
    let [abierto, setAbierto] = useState(false)

    // Cerrar el menú con la tecla Escape.
    // Cleanup: al desmontar el Navbar se quita el evento con removeEventListener (rúbrica: Hooks > cleanUp)
    useEffect(() => {
        function teclaEscape(evento){
            if(evento.key == "Escape"){
                setAbierto(false)
            }
        }
        window.addEventListener("keydown", teclaEscape)
        return () => window.removeEventListener("keydown", teclaEscape)
    }, [])

    return <div className="navbar-wrap">
        <nav className="navbar">
            {/* Botón de 3 rayitas: solo se ve en móvil (ver index.css) */}
            <button className={ abierto ? "nav-hamburguesa abierto" : "nav-hamburguesa" }
                onClick={ () => setAbierto( anterior => !anterior ) }
                aria-label={ abierto ? "Cerrar menú" : "Abrir menú" } aria-expanded={abierto}>
                <span></span>
                <span></span>
                <span></span>
            </button>

            <Link to="/" className="marca">
                <LogoB size={36} />
                <span>bity bites</span>
            </Link>

            {/* Al pulsar cualquier enlace, el menú del móvil se cierra */}
            <div className={ abierto ? "nav-links abierto" : "nav-links" } onClick={ () => setAbierto(false) }>
                {
                    NAV_ENLACES.map( ({ texto, ruta, preview }) => <div className="nav-item" key={texto}>
                        {
                            // Enlaces con "#" van con <a> normal; el resto con <Link> del router
                            ruta.includes("#")
                            ? <a href={ruta}>{ texto }</a>
                            : <Link to={ruta}>{ texto }</Link>
                        }

                        {/* Megamenú: vista previa de la sección (solo en ordenador, al pasar el ratón) */}
                        {
                            preview &&
                            <div className="mega">
                                <div className={ preview.foto ? "mega-imagenes foto" : "mega-imagenes" }>
                                    {
                                        preview.imagenes.map( imagen => <img key={imagen} src={ "/" + imagen } alt="" loading="lazy" /> )
                                    }
                                </div>
                                <div className="mega-texto">
                                    <h4>{ preview.titulo }</h4>
                                    <p>{ preview.texto }</p>
                                    {
                                        ruta.includes("#")
                                        ? <a href={ruta} className="mega-cta">{ preview.cta } →</a>
                                        : <Link to={ruta} className="mega-cta">{ preview.cta } →</Link>
                                    }
                                </div>
                            </div>
                        }
                    </div> )
                }
            </div>

            <div className="nav-acciones">
                {
                    usuario
                    ? <Link to={ usuario.rol == "admin" ? "/admin" : "/perfil" } className="nav-cuenta">
                        { usuario.rol == "admin" ? "Panel" : "Mi cuenta" }
                    </Link>
                    : <Link to="/login" className="nav-cuenta">Entrar</Link>
                }
                <Link to="/carrito" className="nav-carrito" aria-label="Tu combo">
                    <IconoCarrito size={22} />
                    { totalUnidades > 0 && <span className="badge">{ totalUnidades }</span> }
                </Link>
                <a href="/#catalogo" className="btn-pedir">Pedir ahora</a>
            </div>
        </nav>

        {/* Invitación a registrarse tras unos segundos navegando */}
        <AvisoRegistro />
    </div>
}

export default Navbar
