// La URL base de la API se lee de una variable de entorno de Vite (import.meta.env).
// Fuente: documentación de Vite.
const API_URL = import.meta.env.VITE_API_URL

export function leerGalletas(){
    return fetch(`${API_URL}/galletas`)
        .then( respuesta => respuesta.json() )
}

export function crearGalleta(galleta){
    return fetch(`${API_URL}/galletas`, {
        method : "POST",
        body : JSON.stringify(galleta),
        headers : { "Content-type" : "application/json" }
    })
    .then( respuesta => respuesta.json() )
}

export function actualizarGalleta(id, cambios){
    return fetch(`${API_URL}/galletas/${id}`, {
        method : "PUT",
        body : JSON.stringify(cambios),
        headers : { "Content-type" : "application/json" }
    })
    .then( respuesta => respuesta.json() )
}

export function borrarGalleta(id){
    return fetch(`${API_URL}/galletas/${id}`, {
        method : "DELETE"
    })
    .then( respuesta => respuesta.json() )
}