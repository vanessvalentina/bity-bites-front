// Componente stateless: el logo REAL de Bity Bites (círculo rosa con la "b" manuscrita y el mordisco),
// sacado del logo.pdf de Gabriela con fondo transparente
function LogoB({ size = 40 }){
    // para tamaños pequeños se usa la versión ligera de 128 px
    let imagen = size <= 64 ? "/logo/logo-128.png" : "/logo/logo.png"
    return <img src={imagen} width={size} height={size} alt="Bity Bites" className="logo-b" />
}

export default LogoB
