import { MOODS_MUSICA } from "@/const/constantes"

/**
 * Componente stateless: tarjeta de una galleta con su mood en la página de Música.
 * @prop     {String}    _id     Id de la galleta
 * @prop     {String}    nombre  Nombre de la galleta
 * @prop     {String}    mood    Mood (Cozy, Intenso…)
 * @prop     {String}    imagen  Foto de la galleta
 * @prop     {Boolean}   activo  Si es la elegida
 * @prop     {Function}  elegir  Cambia la galleta elegida
 */
function MoodCard({ _id, nombre, mood, imagen, activo, elegir }){

    let info = MOODS_MUSICA[mood] || { emoji : "🎵", color : "#FCE3EC" }

    return <button className={ activo ? "mood-card activo" : "mood-card" } onClick={ () => elegir(_id) }
        style={{ backgroundColor : info.color }} aria-pressed={activo}>
        <img src={ "/" + imagen } alt="" />
        <span className="mood-card-emoji">{ info.emoji }</span>
        <strong>{ mood }</strong>
        <small>{ nombre }</small>
    </button>
}

export default MoodCard
