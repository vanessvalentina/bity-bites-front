/*-----------------------------------------------------------------------*\
 * services/api.js — todas las peticiones a la API con fetch (como en clase)
 *   - Galletas:  crearGalleta, actualizarGalleta, borrarGalleta        (solo admin, con token)
 *   - Usuarios:  login, registro, actualizarPerfil, cambiarPassword
 *   - Pedidos:   crearPedido (invitado o cliente), cambiarEstadoPedido (admin)
 *   - Mensajes:  crearMensaje (público), marcarMensaje, borrarMensaje (admin)
 *   - textoError: convierte cualquier error en un texto para enseñarlo en pantalla
 *   Las lecturas (GET) se hacen con el hook useFetch.
 *-----------------------------------------------------------------------*/
import { API_URL } from "@/const/constantes"
// La URL base de la API está en las constantes (sale de la variable de entorno VITE_API_URL)

// Igual que en clase: se mira el status de la respuesta y si no es el esperado se lanza un error.
// Cuando la API manda { error : "..." } usamos ese texto para enseñarlo en pantalla.

// Convierte cualquier error en un texto para enseñarlo en pantalla.
// Si la API está apagada o no hay internet, fetch no da un texto sino un objeto de error.
// FUERA DEL TEMARIO: typeof dice de qué tipo es un dato. Hecho con ayuda de IA (Claude).
export function textoError(error){
    if(typeof error == "string"){
        return error
    }
    return "Ahora mismo no podemos conectar. Inténtalo de nuevo en un momento 🍪"
}

// ---- Galletas ----

export function crearGalleta(galleta, token){
    return fetch(`${API_URL}/galletas`, {
        method : "POST",
        body : JSON.stringify(galleta),
        headers : {
            "Content-type" : "application/json",
            "Authorization" : "Bearer " + token
        }
    })
    .then( respuesta => {
        if(respuesta.status == 201){
            return respuesta.json()
        }
        throw "Error al crear la galleta"
    })
}

export function actualizarGalleta(id, cambios, token){
    return fetch(`${API_URL}/galletas/${id}`, {
        method : "PUT",
        body : JSON.stringify(cambios),
        headers : {
            "Content-type" : "application/json",
            "Authorization" : "Bearer " + token
        }
    })
    .then( respuesta => {
        if(respuesta.status == 200){
            return respuesta.json()
        }
        throw "Error al actualizar la galleta"
    })
}

export function borrarGalleta(id, token){
    return fetch(`${API_URL}/galletas/${id}`, {
        method : "DELETE",
        headers : {
            "Authorization" : "Bearer " + token
        }
    })
    .then( respuesta => {
        if(respuesta.status == 200){
            return respuesta.json()
        }
        throw "Error al borrar la galleta"
    })
}

// ---- Usuarios ----
export function login(usuario){
    return fetch(`${API_URL}/usuarios/login`, {
        method : "POST",
        body : JSON.stringify(usuario),
        headers : {
            "Content-type" : "application/json"
        }
    })
    .then( respuesta => {
        if(respuesta.status == 200){
            return respuesta.json()
        }
        // 500 = fallo del servidor o de la base de datos (no es culpa del usuario)
        if(respuesta.status == 500){
            throw "Ahora mismo no podemos conectar. Inténtalo de nuevo en un momento 🍪"
        }
        throw "Email o contraseña incorrectos"
    })
}

export function registro(usuario){
    return fetch(`${API_URL}/usuarios/registro`, {
        method : "POST",
        body : JSON.stringify(usuario),
        headers : {
            "Content-type" : "application/json"
        }
    })
    .then( respuesta => {
        if(respuesta.status == 201){
            return respuesta.json()
        }
        // 400 -> la API explica qué falla (email repetido, contraseña corta...)
        return respuesta.json().then( ({error}) => { throw error } )
    })
}

// ---- Pedidos ----
// token puede ser null (pedido de invitado)
export function crearPedido(pedido, token){
    let headers = { "Content-type" : "application/json" }

    if(token){
        headers["Authorization"] = "Bearer " + token
    }

    return fetch(`${API_URL}/pedidos`, {
        method : "POST",
        body : JSON.stringify(pedido),
        headers
    })
    .then( respuesta => {
        if(respuesta.status == 201){
            return respuesta.json()
        }
        return respuesta.json().then( ({error}) => { throw error } )
    })
}



export function cambiarEstadoPedido(id, estado, token){
    return fetch(`${API_URL}/pedidos/${id}`, {
        method : "PATCH",
        body : JSON.stringify({ estado }),
        headers : {
            "Content-type" : "application/json",
            "Authorization" : "Bearer " + token
        }
    })
    .then( respuesta => {
        if(respuesta.status == 204){
            return
        }
        throw "Error al cambiar el estado"
    })
}

// ---- Mensajes (Contacto) ----
export function crearMensaje(mensaje){
    return fetch(`${API_URL}/mensajes`, {
        method : "POST",
        body : JSON.stringify(mensaje),
        headers : {
            "Content-type" : "application/json"
        }
    })
    .then( respuesta => {
        if(respuesta.status == 201){
            return respuesta.json()
        }
        return respuesta.json().then( ({error}) => { throw error } )
    })
}

export function marcarMensaje(id, leido, token){
    return fetch(`${API_URL}/mensajes/${id}`, {
        method : "PATCH",
        body : JSON.stringify({ leido }),
        headers : {
            "Content-type" : "application/json",
            "Authorization" : "Bearer " + token
        }
    })
    .then( respuesta => {
        if(respuesta.status == 204){
            return
        }
        throw "Error al actualizar el mensaje"
    })
}

export function borrarMensaje(id, token){
    return fetch(`${API_URL}/mensajes/${id}`, {
        method : "DELETE",
        headers : {
            "Authorization" : "Bearer " + token
        }
    })
    .then( respuesta => {
        if(respuesta.status == 204){
            return
        }
        throw "Error al borrar el mensaje"
    })
}

// ---- Mi perfil ----
export function actualizarPerfil(datos, token){
    return fetch(`${API_URL}/usuarios/perfil`, {
        method : "PUT",
        body : JSON.stringify(datos),
        headers : {
            "Content-type" : "application/json",
            "Authorization" : "Bearer " + token
        }
    })
    .then( respuesta => {
        if(respuesta.status == 200){
            return respuesta.json()
        }
        return respuesta.json().then( ({error}) => { throw error } )
    })
}

export function cambiarPassword(datos, token){
    return fetch(`${API_URL}/usuarios/password`, {
        method : "PATCH",
        body : JSON.stringify(datos),
        headers : {
            "Content-type" : "application/json",
            "Authorization" : "Bearer " + token
        }
    })
    .then( respuesta => {
        if(respuesta.status == 204){
            return
        }
        return respuesta.json().then( ({error}) => { throw error } )
    })
}
