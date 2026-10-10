import LogoB from "@/components/LogoB"

// Componente stateless (sin estado): se ve mientras Suspense carga una página
function Cargando(){
    return <div className="cargando">
        <LogoB size={64} />
        <p>Horneando…</p>
    </div>
}

export default Cargando
