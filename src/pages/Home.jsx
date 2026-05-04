// src/pages/Home.jsx
import Hero from '../components/Hero'
import Catalog from './Catalog'
import { useRef } from 'react';

const Home = () => {
    const CatalogRef = useRef(null); // Creo la referencia
    return (
        <>
            <Hero CatalogRef={CatalogRef} />
            <div ref={CatalogRef}>
                <Catalog type="destacados" limit={4} />{/* Muestra 4 productos del catalogo Productos*/}
                <Catalog type="ofertas" limit={4} />{/* Muestra 4 productos del catalogo Accesorios*/}

            </div>
        </>
    )
}

export default Home