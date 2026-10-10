import { MOODS_MUSICA } from "@/const/constantes"

// Componente stateless: una galleta con su mood para elegir playlist (recibe las props deconstruidas)
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
