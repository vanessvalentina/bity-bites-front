import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import MoodCard from "@/components/MoodCard"
import useFetch from "@/hooks/useFetch"
import { MOODS_MUSICA, API_URL } from "@/const/constantes"

// Saca el id de la playlist del enlace: https://open.spotify.com/playlist/ID?si=... -> ID
function idPlaylist(enlace){
    return enlace.split("/playlist/")[1].split("?")[0]
}

// Página "Conecta con cada mordida": eliges el mood de tu galleta y suena su playlist.
// También es el destino del QR del empaque: /momento?mood=cozy (o ?galleta=<id>) abre directamente la de esa galleta.
function Musica(){

    // Se piden las galletas otra vez al entrar (hook personalizado): así siempre salen las playlists
    // más recientes, aunque Gabriela las acabe de cambiar desde su panel
    let { datos : galletas, cargando } = useFetch(API_URL + "/galletas")

    // Galleta elegida + si ya pulsó "Escuchar" (datos relacionados en un solo useState).
    // FUERA DEL TEMARIO: window.location.search lee "?galleta=..." del QR. Hecho con ayuda de IA (Claude).
    let [eleccion, setEleccion] = useState({
        galletaId : window.location.search.includes("galleta=") ? window.location.search.split("galleta=")[1].split("&")[0] : null,
        escuchando : false
    })

    // Al entrar en la página, empezar arriba del todo
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    let conMusica = galletas.filter( galleta => galleta.mood )
    // Los QR impresos usan el mood: /momento?mood=cozy (así siguen funcionando aunque cambien los _id)
    let moodQR = window.location.search.includes("mood=") ? window.location.search.split("mood=")[1].split("&")[0].toLowerCase() : null

    // FUERA DEL TEMARIO: .find() (ver App.jsx). Orden: la que se ha pulsado, la del QR o la primera.
    let elegida = conMusica.find( galleta => galleta._id == eleccion.galletaId )
        || conMusica.find( galleta => moodQR && galleta.mood.toLowerCase() == moodQR )
        || conMusica[0]
    let info = elegida ? (MOODS_MUSICA[elegida.mood] || {}) : {}

    function elegir(id){
        setEleccion( anterior => ({ ...anterior, galletaId : id }) )
    }

    return <>
        <Navbar />
        <main>
            <section className="musica">
                <div className="seccion-head">
                    <span className="eyebrow">Música para comer cookies</span>
                    <h2>Conecta con cada <em>mordida</em></h2>
                    <p>Elige el mood de tu galleta, dale al play y saboréala despacito. 🎧</p>
                </div>

                { cargando && <p className="aviso">Afinando las playlists…</p> }

                {
                    elegida &&
                    <div className="musica-grid">

                        {/* 1. Los 6 moods: uno por galleta */}
                        <div className="moods">
                            {
                                conMusica.map( galleta => <MoodCard key={galleta._id} {...galleta}
                                    activo={ galleta._id == elegida._id } elegir={elegir} /> )
                            }
                        </div>

                        {/* 2. Reproductor de la playlist elegida */}
                        <div className="reproductor" style={{ backgroundColor : info.color }}>
                            <div className="reproductor-head">
                                <img src={ "/" + elegida.imagen } alt={ elegida.nombre } />
                                <div>
                                    <span className="eyebrow">{ info.emoji } Mood { elegida.mood }</span>
                                    <h3>Bity Bites · { elegida.mood }</h3>
                                    <p>{ info.ambiente } Perfecta con tu cookie de { elegida.nombre.toLowerCase() }.</p>
                                </div>
                            </div>

                            {
                                !elegida.playlistUrl
                                ? <p className="reproductor-pronto">Muy pronto 🎵 Gabriela está preparando esta playlist.</p>
                                : eleccion.escuchando
                                    // El reproductor de Spotify solo se carga después de pulsar "Escuchar" (ver /privacidad)
                                    ? <iframe key={elegida._id} className="spotify"
                                        src={ "https://open.spotify.com/embed/playlist/" + idPlaylist(elegida.playlistUrl) + "?utm_source=generator" }
                                        title={ "Playlist " + elegida.mood + " de Bity Bites" }
                                        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
                                    : <div className="reproductor-play">
                                        <button className="btn-primario" onClick={ () => setEleccion( anterior => ({ ...anterior, escuchando : true }) ) }>▶ Escuchar aquí</button>
                                        <small>Al pulsar se carga el reproductor de Spotify, que puede usar sus propias cookies. <Link to="/privacidad">Más info</Link></small>
                                    </div>
                            }

                            {
                                elegida.playlistUrl &&
                                <a className="reproductor-spotify" href={elegida.playlistUrl} target="_blank" rel="noopener noreferrer">Abrir en Spotify ↗</a>
                            }
                        </div>
                    </div>
                }

                <div className="musica-momento">
                    <p>“Respira, dale un mordisco despacio y deja que la canción haga el resto.”</p>
                    <Link to="/" className="btn-secundario">Elegir mi cookie →</Link>
                </div>
            </section>
        </main>
        <Footer />
    </>
}

export default Musica
