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
                <Catalog limit={4} />{/* Muestra 8 productos del catalogo */}
            </div>
        </>
    )
}

export default Home