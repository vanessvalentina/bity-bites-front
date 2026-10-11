import { useState, useEffect } from "react"

// Hook personalizado (rúbrica: Hooks > Hooks personalizados).
// Pide datos a la API con fetch + useEffect (como en clase) y devuelve { datos, cargando, error, setDatos }.
// - url: dirección a la que pedir (si es null no pide nada, ej. sin sesión)
// - token: opcional, para las rutas privadas de la API
// - clave: opcional. Si se da, los datos se guardan en localStorage con esa clave: la próxima vez
//   la página los enseña al instante mientras llegan los nuevos de la API (rúbrica: optimizar la carga)
// localStorage solo guarda texto: se usa JSON.stringify / JSON.parse (como en clase).
// try/catch por si el navegador no deja usar localStorage (modo privado) o el dato está roto.
function leerGuardado(clave){
    try{
        return JSON.parse(localStorage.getItem(clave))
    }catch(e){
        return null
    }
}

function guardar(clave, datos){
    try{
        localStorage.setItem(clave, JSON.stringify(datos))
    }catch(e){
        // si no se puede guardar, la web sigue funcionando igual
    }
}

/**
 * Hook personalizado useFetch
 * @hooks    {useState, useEffect}
 *
 * Este hook sirve para pedir datos a la API (GET) y saber si están cargando o si ha habido error.
 * Si se le da una clave, guarda la respuesta en localStorage para enseñarla al instante la próxima vez.
 *
 * @param    {string}  url    URL a la que se realizará la solicitud GET (null = no pide nada)
 * @param    {string}  token  Token JWT para las rutas privadas (opcional)
 * @param    {string}  clave  Clave de localStorage para guardar los datos (opcional)
 * @returns  {Object}  { datos, cargando, error, setDatos }
 */
function useFetch(url, token = null, clave = null){

    // Un solo useState con los datos relacionados de la petición
    let [peticion, setPeticion] = useState( () => {
        // función como valor inicial: solo se lee localStorage la primera vez
        let guardado = clave ? leerGuardado(clave) : null
        return { datos : guardado || [], cargando : !guardado, error : false }
    })

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
        .then( datos => {
            setPeticion({ datos, cargando : false, error : false })
            if(clave){
                guardar(clave, datos)
            }
        })
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
