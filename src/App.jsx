import { useState, lazy, Suspense } from "react"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import GalletasContext from "@/context/GalletasContext"
import CarritoContext from "@/context/CarritoContext"
import SesionContext from "@/context/SesionContext"
import useFetch from "@/hooks/useFetch"
import Cargando from "@/components/Cargando"
import { API_URL } from "@/const/constantes"

// Páginas con carga diferida (lazy): cada una se descarga solo cuando se visita.
// Mientras llega, <Suspense> enseña el componente <Cargando /> (rúbrica: Arquitectura > Suspense)
const Inicio = lazy(() => import("@/pages/Inicio"))
const Packs = lazy(() => import("@/pages/Packs"))
const Carrito = lazy(() => import("@/pages/Carrito"))
const Login = lazy(() => import("@/pages/Login"))
const Perfil = lazy(() => import("@/pages/Perfil"))
const Admin = lazy(() => import("@/pages/Admin"))
const Gabriela = lazy(() => import("@/pages/Gabriela"))
const Contacto = lazy(() => import("@/pages/Contacto"))
const Privacidad = lazy(() => import("@/pages/Privacidad"))
const Musica = lazy(() => import("@/pages/Musica"))
const Error404 = lazy(() => import("@/pages/Error404"))

// Rutas de la tienda (como en la carpeta "router" de clase)
const router = createBrowserRouter([
    {
        path : "/",
        element : <Inicio />,
        errorElement : <Error404 />
    },
    {
        path : "/packs",
        element : <Packs />
    },
    {
        path : "/carrito",
        element : <Carrito />
    },
    {
        path : "/login",
        element : <Login />
    },
    {
        path : "/perfil",
        element : <Perfil />
    },
    {
        path : "/admin",
        element : <Admin />
    },
    {
        path : "/momento",
        element : <Musica />
    },
    {
        path : "/gabriela",
        element : <Gabriela />
    },
    {
        path : "/privacidad",
        element : <Privacidad />
    },
    {
        path : "/contacto",
        element : <Contacto />
    }
])

// Componente con estado (stateful): guarda sesión, galletas y carrito y los reparte con Context
function App(){

    // ---- Sesión (login) ----
    // token y usuario van juntos en un solo useState (datos relacionados).
    // El token vive en memoria, como en clase: al recargar la página hay que volver a entrar.
    let [sesion, setSesion] = useState({ token : null, usuario : null })

    function iniciarSesion({ token, usuario }){
        setSesion({ token, usuario })
    }

    // Tras editar el perfil: se cambian los datos del usuario y se mantiene el token
    function actualizarUsuario(usuario){
        setSesion( anterior => ({ ...anterior, usuario }) )
    }

    function cerrarSesion(){
        setSesion({ token : null, usuario : null })
    }

    // ---- Galletas (catálogo) con el hook personalizado ----
    let { datos : galletas, cargando, error, setDatos : setGalletas } = useFetch(API_URL + "/galletas")

    // Estas tres solo cambian el estado; la petición a la API la hace el componente
    // que las llama (FormularioGalleta, ModalEditar, ModalBorrar).
    // Setter con función (anteriores => ...) + spread para no mutar el estado.
    function agregarGalleta(galleta){
        setGalletas( anteriores => [...anteriores, galleta] )
    }

    function editarGalleta(id, cambios){
        setGalletas( anteriores => anteriores.map( galleta => galleta._id == id ? { ...galleta, ...cambios } : galleta ) )
    }

    function eliminarGalleta(id){
        setGalletas( anteriores => anteriores.filter( galleta => galleta._id != id ) )
    }

    // ---- Carrito "Tu combo" ----
    let [carrito, setCarrito] = useState([])

    // Suma una galleta (o el pack) a una lista de carrito: si ya está, aumenta la cantidad
    function sumarAlCarrito(lista, galleta, cantidad){
        // FUERA DEL TEMARIO: .find() devuelve el primer elemento que cumple la condición (o undefined).
        // Hecho con ayuda de IA (Claude). Documentación: https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/find
        let existe = lista.find( item => item._id == galleta._id )
        if(existe){
            return lista.map( item => item._id == galleta._id ? { ...item, cantidad : item.cantidad + cantidad } : item )
        }
        return [...lista, { ...galleta, cantidad }]
    }

    function agregarAlCarrito(galleta, cantidad = 1){
        setCarrito( anterior => sumarAlCarrito(anterior, galleta, cantidad) )
    }

    // Añade varias galletas de golpe (la caja de Packs)
    function agregarVarios(lista){
        lista.forEach( galleta => setCarrito( anterior => sumarAlCarrito(anterior, galleta, galleta.cantidad) ) )
    }

    function cambiarCantidad(id, cantidad){
        if(cantidad < 1){
            return setCarrito( anterior => anterior.filter( item => item._id != id ) )
        }
        setCarrito( anterior => anterior.map( item => item._id == id ? { ...item, cantidad } : item ) )
    }

    function quitarDelCarrito(id){
        setCarrito( anterior => anterior.filter( item => item._id != id ) )
    }

    function vaciarCarrito(){
        setCarrito([])
    }

    return <SesionContext.Provider value={{ ...sesion, iniciarSesion, cerrarSesion, actualizarUsuario }}>
            <GalletasContext.Provider value={{ galletas, cargando, error, agregarGalleta, editarGalleta, eliminarGalleta }}>
                <CarritoContext.Provider value={{ carrito, agregarAlCarrito, agregarVarios, cambiarCantidad, quitarDelCarrito, vaciarCarrito }}>
                    <Suspense fallback={ <Cargando /> }>
                        <RouterProvider router={router} />
                    </Suspense>
                </CarritoContext.Provider>
            </GalletasContext.Provider>
           </SesionContext.Provider>
}

export default App
