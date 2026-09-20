import { useState, useEffect } from "react"
import GalletasContext from "./context/GalletasContext"
import { leerGalletas, borrarGalleta, actualizarGalleta } from "./services/api"
import Inicio from "./pages/Inicio"

function App(){

    let [galletas, setGalletas] = useState([])
    let [cargando, setCargando] = useState(true)
    let [error, setError] = useState(false)

    useEffect(() => {
        leerGalletas()
        .then( datos => setGalletas(datos) )
        .catch( () => setError(true) )
        .finally( () => setCargando(false) )
    }, [])

    function agregarGalleta(galleta){
        setGalletas([...galletas, galleta])
    }

    function eliminarGalleta(id){
        borrarGalleta(id)
        .then( () => setGalletas(galletas.filter( g => g._id != id )) )
    }

    function editarGalleta(id, cambios){
        actualizarGalleta(id, cambios)
        .then( () => setGalletas(galletas.map( g => g._id == id ? { ...g, ...cambios } : g )) )
    }

    return <GalletasContext.Provider value={{ galletas, cargando, error, agregarGalleta, eliminarGalleta, editarGalleta }}>
        <Inicio />
    </GalletasContext.Provider>
}

export default App