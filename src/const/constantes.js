/*-----------------------------------------------------------------------*\
 * const/constantes.js — constantes de la tienda en UPPER_SNAKE_CASE
 *   API_URL, PACK_TRES, SECCIONES_CATALOGO, STICKERS_HERO2, ENCARGOS, ESTADOS_PEDIDO,
 *   NAV_ENLACES (megamenú), CONTACTO_TIENDA, ENLACES_FOOTER, textos de Gabriela,
 *   NY_COOKIE, TIPOS_CONTACTO, MOODS_MUSICA y PRIVACIDAD
 *-----------------------------------------------------------------------*/
// Constantes de la tienda, todas juntas y en UPPER_SNAKE_CASE (rúbrica: Arquitectura > Constantes)

// URL de la API: viene del archivo .env (VITE_API_URL), nunca escrita a fuego en el código
export const API_URL = import.meta.env.VITE_API_URL

// Pack de la casa: 1 vainilla + 1 chocolate + 1 chocovainilla (precio real de Gabriela)
export const PACK_TRES = {
    _id : "pack-3",
    nombre : "Pack de 3 clásicas",
    precio : 5.90,
    imagen : "packs/cajita.webp"
}

// Secciones del catálogo (filtro de la home)
export const SECCIONES_CATALOGO = [
    { categoria : "clasica", titulo : "Clásicas", precio : "2,20 €", texto : "Las de siempre, hechas a mano cada día." },
    { categoria : "especial", titulo : "Especiales rellenas", precio : "3,80 €", texto : "Con corazón cremoso por dentro." }
]

// Stickers del hero, de izquierda a derecha (la posición de cada uno está en index.css)
export const STICKERS_HERO = ["freshly", "heart1", "rays1", "logo", "family", "star", "rays2", "crunchy", "good", "heart2", "rays3"]

// Encargos y regalos (página Packs)
export const ENCARGOS = [
    { titulo : "Cumpleaños", texto : "Caja con su nombre y sus sabores favoritos.", foto : "reales/galletas_18.jpg" },
    { titulo : "Para dar las gracias", texto : "Bolsitas con mensaje para profes, equipos o amigos.", foto : "reales/galletas_27.jpg" },
    { titulo : "Regalos de empresa", texto : "Detalles personalizados para eventos y equipos.", foto : "reales/galletas_31.jpg" }
]

// Estados de un pedido (los mismos que acepta la API) y los que cuentan como "en curso"
export const ESTADOS_PEDIDO = ["pendiente", "preparando", "listo", "entregado", "cancelado"]
export const ESTADOS_ACTIVOS = ["pendiente", "preparando", "listo"]

// ---- Página "Sobre Gabriela" ----
export const INSTAGRAM_URL = "https://www.instagram.com/bitybitescookies/"

// "Sobre mí": texto de Gabriela en su Instagram (@bitybitescookies) + 2 frases sobre ella (aprobadas por Vanessa, 10 oct)
export const GABRIELA_SALUDO = "Hello, Cookie lovers!"
export const GABRIELA_INTRO = [
    "Empezamos este viaje dulce con el corazón (y el horno) bien calentito.",
    "En Bity Bites creemos que una buena cookie puede cambiarte el día… y estamos aquí para probarlo.",
    "Soy mamá, profe de inglés de formación y crear me sale del corazón: todo empezó en mi cocina, con mucho amor y chocolate.",
    "Hoy horneamos en Madrid cookies al estilo Nueva York, a mano y en pequeñas tandas."
]
export const GABRIELA_PREGUNTA = "¿Te animas a darle el primer mordisco?"

// "¿Cómo debe ser una New York Cookie?": textos de Gabriela en su Instagram (post + infografía)
// posicion = dónde va cada etiqueta alrededor de la cookie (y hacia dónde apunta su flecha)
export const NY_COOKIE = {
    antetitulo : "¿Cómo debe ser una",
    titulo : "New York Cookie?",
    puntos : [
        { titulo : "Gran tamaño", texto : "Como para compartir… o no.", posicion : "arriba-izq" },
        { titulo : "Crocante por fuera", texto : "Con ese borde doradito que cruje.", posicion : "arriba-der" },
        { titulo : "Suavecita por dentro", texto : "Gordita y chunky, con esa textura que la hace única.", posicion : "abajo-izq" },
        { titulo : "El mejor chocolate", texto : "Con trozos de chocolate en cada mordida.", posicion : "abajo-centro" },
        { titulo : "El horneado perfecto", texto : "Ni un minuto más, ni uno menos.", posicion : "abajo-der" }
    ],
    cierre : "Y sobre todo: hecha con amor y cero culpa. En Bity Bites nos tomamos todo esto muy en serio.",
    pregunta : "¿Ya la has probado o te atreves con la primera?"
}

// Pasos 2-4: escritos con el tono de Gabriela (ver notes/gabriela-perfil.md); revisarlos con ella
export const GABRIELA_PROCESO = [
    // Paso 1: texto de Gabriela en su Instagram sobre la masa de vainilla
    { paso : 1, titulo : "La masa", texto : "Nuestra masa de vainilla es puro amor: suave y con el mejor chocolate. ¡Y sí, está tan rica cruda como horneada!", foto : "reales/galletas_9.jpg" },
    { paso : 2, titulo : "Bolitas a mano", texto : "Grandes y gorditas, formadas una a una. ¡Aquí empieza la magia chunky!", foto : "reales/galletas_22.jpg" },
    { paso : 3, titulo : "Horno y rejilla", texto : "Al horno hasta que quedan doraditas por fuera y suaves por dentro… y a esperar (lo más difícil) a que se enfríen.", foto : "reales/galletas_8.jpg" },
    { paso : 4, titulo : "Con cariño", texto : "Con su tarjeta Cookies Care y el corazón puesto en cada detalle. Tú solo disfruta.", foto : "reales/galletas_12.jpg" }
]

// ---- Contacto ----
// Tipos de consulta (los mismos que acepta la API en /api/mensajes)
export const TIPOS_CONTACTO = [
    { valor : "encargo", texto : "Encargo / sabores a medida", icono : "🍪" },
    { valor : "cumpleanos", texto : "Cumpleaños o celebración", icono : "🎂" },
    { valor : "empresa", texto : "Regalos de empresa", icono : "🎁" },
    { valor : "duda", texto : "Otra duda", icono : "💬" }
]

// ---- Footer y datos de contacto de la tienda ----
export const CONTACTO_TIENDA = {
    // Móvil de Gabriela (con prefijo de España). Si algún día se quita (null), el footer deja de enseñarlo.
    telefono : "+34 679 90 73 39",
    instagram : "@bitybitescookies",
    direccion : "Madrid, Valdemoro",
    playlist : "/momento"
}

// Resumen de secciones para el footer
export const ENLACES_FOOTER = [
    {
        titulo : "La tienda",
        enlaces : [
            { texto : "Inicio", ruta : "/" },
            { texto : "Cookies", ruta : "/#catalogo" },
            { texto : "Packs", ruta : "/packs" },
            { texto : "Encargos y regalos", ruta : "/packs#encargos" }
        ]
    },
    {
        titulo : "Bity Bites",
        enlaces : [
            { texto : "Sobre Gabriela", ruta : "/gabriela" },
            { texto : "Música", ruta : "/momento" },
            { texto : "Contacto", ruta : "/contacto" },
            { texto : "Privacidad", ruta : "/privacidad" }
        ]
    },
    {
        titulo : "Tu cuenta",
        enlaces : [
            { texto : "Entrar / Registrarme", ruta : "/login" },
            { texto : "Mis pedidos", ruta : "/perfil" },
            { texto : "Tu combo", ruta : "/carrito" }
        ]
    }
]

// ---- Navbar + megamenú (vista previa de cada sección al pasar el ratón) ----
export const NAV_ENLACES = [
    { texto : "Inicio", ruta : "/" },
    {
        texto : "Cookies", ruta : "/#catalogo",
        preview : {
            titulo : "Nuestras cookies",
            texto : "Clásicas a 2,20 € y especiales rellenas a 3,80 €. NY style, gorditas y chunky.",
            imagenes : ["render/vainilla.png", "render/chocolate.png", "render/cookiescream.png"],
            cta : "Ver el menú"
        }
    },
    {
        texto : "Packs", ruta : "/packs",
        preview : {
            titulo : "Haz tu pack",
            texto : "Pack de 3 clásicas por 5,90 € o arma tu caja con tus favoritas.",
            imagenes : ["packs/cajita.webp"],
            cta : "Armar mi caja"
        }
    },
    {
        texto : "Música", ruta : "/momento",
        preview : {
            titulo : "Conecta con cada mordida",
            texto : "Una playlist para cada galleta: Cozy, Intenso, Feliz, Nostalgia, Chill e Indulgente.",
            imagenes : ["render/chocopistacho.png"],
            cta : "Escuchar"
        }
    },
    {
        texto : "Gabriela", ruta : "/gabriela",
        preview : {
            titulo : "Hello, Cookie lovers!",
            texto : "Conoce a Gabriela y cómo nace cada Bity Bite, del bol a tu mano.",
            imagenes : ["gabriela/gabriela.webp"],
            foto : true,
            cta : "Conócela"
        }
    },
    {
        texto : "Contacto", ruta : "/contacto",
        preview : {
            titulo : "¡Hablemos de cookies!",
            texto : "Encargos, cumpleaños y regalos de empresa. Desde Valdemoro (Madrid).",
            imagenes : ["reales/galletas_18.jpg"],
            foto : true,
            cta : "Escríbenos"
        }
    }
]

// Stickers que quedan en el hero nuevo (estilo Rollin / Bakerville)
export const STICKERS_HERO2 = ["freshly", "crunchy", "heart2"]

// ---- Política de privacidad (RGPD / LOPDGDD) ----
// ⚠️ Plantilla orientativa: Gabriela debe completar su nombre completo / NIF como responsable y revisarla.
export const PRIVACIDAD = [
    {
        titulo : "¿Quién es la responsable?",
        texto : "Bity Bites Cookies (Gabriela), con base en Valdemoro (Madrid). Puedes escribirnos desde la página de Contacto o por Instagram (@bitybitescookies)."
    },
    {
        titulo : "¿Qué datos recogemos?",
        texto : "Solo los necesarios: tu nombre, email y, si quieres, teléfono y dirección. Si creas una cuenta, también tu contraseña, que se guarda cifrada (hasheada con bcrypt): nadie, ni siquiera nosotras, puede verla."
    },
    {
        titulo : "¿Para qué los usamos?",
        texto : "Para gestionar tus pedidos y encargos, responder a tus mensajes y guardar tu historial si tienes cuenta. Nunca los vendemos ni los cedemos a terceros, ni te enviamos publicidad sin tu permiso."
    },
    {
        titulo : "¿Por qué podemos usarlos?",
        texto : "Porque nos das tu consentimiento al marcar la casilla de los formularios y porque los necesitamos para preparar y entregarte tu pedido."
    },
    {
        titulo : "¿Cuánto tiempo los guardamos?",
        texto : "Mientras tengas tu cuenta o el tiempo necesario para gestionar tu pedido o mensaje. Después se borran, salvo lo que la ley obligue a conservar."
    },
    {
        titulo : "Tus derechos",
        texto : "Puedes pedirnos ver, corregir o borrar tus datos, oponerte a su uso o limitarlo. Además, con tu cuenta puedes cambiar tus datos tú misma desde 'Mi cuenta'. Si crees que no los tratamos bien, puedes reclamar ante la Agencia Española de Protección de Datos (aepd.es)."
    },
    {
        titulo : "Cookies",
        texto : "Esta web no usa cookies de publicidad ni de estadísticas. Para saber cuántas visitas recibe usamos Vercel Web Analytics, que cuenta las páginas vistas de forma anónima, sin cookies y sin guardar nada en tu dispositivo. La sesión se guarda solo mientras tienes la página abierta. Las playlists de Spotify solo se cargan si pulsas para escucharlas; en ese momento es Spotify quien puede usar sus propias cookies."
    }
]

// ---- Música "Conecta con cada mordida" ----
// Cada mood de galleta (campo "mood" en la BD) con su ambiente. El enlace de la playlist
// está en la BD (campo playlistUrl de cada galleta) y Gabriela lo cambia desde su panel.
export const MOODS_MUSICA = {
    Cozy : { emoji : "☕", ambiente : "Mantita, café y una cookie calentita.", color : "#FDE7D6" },
    Intenso : { emoji : "⚡", ambiente : "Para cuando necesitas energía (y cacao).", color : "#F3D9CF" },
    Feliz : { emoji : "💃", ambiente : "Para bailar en la cocina mientras la saboreas.", color : "#FFF0C2" },
    Nostalgia : { emoji : "📼", ambiente : "Clásicos de siempre, como la primera Oreo.", color : "#E9E4F7" },
    Chill : { emoji : "🌿", ambiente : "Una tarde tranquila, sin prisa.", color : "#DFF1E4" },
    Indulgente : { emoji : "🕯️", ambiente : "Date un capricho: lo mereces.", color : "#F8D9E5" }
}
