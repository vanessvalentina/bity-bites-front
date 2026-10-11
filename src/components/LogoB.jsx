/**
 * Componente stateless: logo real de Bity Bites (sacado del logo.pdf de Gabriela).
 * @prop     {Number}  size  Tamaño en píxeles (40 por defecto)
 */
function LogoB({ size = 40 }){
    // para tamaños pequeños se usa la versión ligera de 128 px
    let imagen = size <= 64 ? "/logo/logo-128.png" : "/logo/logo.png"
    return <img src={imagen} width={size} height={size} alt="Bity Bites" className="logo-b" />
}

export default LogoB
