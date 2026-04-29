import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

function ScrollToTop() {
    // pathname es la ruta actual
    const { pathname } = useLocation()

    useEffect(() => {
        // cuando cambia la ruta, se ejecuta este efecto
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }, [pathname]) // se ejecuta cada vez que cambia la ruta

    // no renderiza nada porque es un componente que solo se ejecuta cuando cambia la ruta
    return null
}

export default ScrollToTop