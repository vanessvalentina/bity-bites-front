import LogoB from "@/components/LogoB"

/**
 * Componente stateless que se enseña mientras Suspense carga una página (fallback).
 */
function Cargando(){
    return <div className="cargando">
        <LogoB size={64} />
        <p>Horneando…</p>
    </div>
}

export default Cargando
