/**
 * Componente stateless: flecha curva dibujada a mano (como las de los posts de Gabriela).
 * Su dirección se cambia con CSS según la etiqueta en la que está (.pos-arriba-izq, etc.).
 */
function Flecha(){
    return <svg className="flecha" viewBox="0 0 120 90" fill="none" stroke="currentColor" strokeWidth="2.6"
        strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M8 12 C 38 -2, 78 8, 92 34 C 100 50, 98 62, 104 76" />
        <path d="M92 66 L104 78 L112 62" />
    </svg>
}

export default Flecha
