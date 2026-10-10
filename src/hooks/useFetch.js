import { useState, useEffect } from "react"

// Hook personalizado (rúbrica: Hooks > Hooks personalizados).
// Pide datos a la API con fetch + useEffect (como en clase) y devuelve { datos, cargando, error, setDatos }.
// - url: dirección a la que pedir (si es null no pide nada, ej. sin sesión)
// - token: opcional, para las rutas privadas de la API
function useFetch(url, token = null){

    // Un solo useState con los datos relacionados de la petición
    let [peticion, setPeticion] = useState({ datos : [], cargando : true, error : false })

    useEffect(() => {
        if(!url){
            return
        }

        let headers = {}
        if(token){
            headers["Authorization"] = "Bearer " + token
        }

        fetch(url, { headers })
        .then( respuesta => {
            if(respuesta.status == 200){
                return respuesta.json()
            }
            throw "Error al cargar los datos"
        })
        .then( datos => setPeticion({ datos, cargando : false, error : false }) )
        // setter con función: parte del estado anterior para no mutarlo
        .catch( () => setPeticion( anterior => ({ ...anterior, cargando : false, error : true }) ) )
    }, [url, token])

    // Para cambiar la lista desde fuera (añadir, editar, borrar) sin perder cargando/error.
    // Recibe una función (anterior => nueva lista), igual que el setter de useState.
    function setDatos(cambio){
        setPeticion( anterior => ({ ...anterior, datos : cambio(anterior.datos) }) )
    }

    return { ...peticion, setDatos }
}

export default useFetch
