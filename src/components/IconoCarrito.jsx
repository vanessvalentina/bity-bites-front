/**
 * Componente stateless: icono SVG de la bolsa del carrito.
 * @prop     {Number}  size  Tamaño en píxeles (24 por defecto)
 */
function IconoCarrito({ size = 24 }){
    return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
        strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M5 8h14l-1.2 11.1a2 2 0 0 1-2 1.9H8.2a2 2 0 0 1-2-1.9L5 8z" />
        <path d="M9 10V7a3 3 0 0 1 6 0v3" />
    </svg>
}

export default IconoCarrito
