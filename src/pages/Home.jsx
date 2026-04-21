// src/pages/Home.jsx
import Hero from '../components/Hero'
import Catalog from './Catalog'

const Home = () => {
    return (
        <>
            <Hero />
            {/* Muestra todos los productos, accesorios y ofertas */}
            <Catalog />
        </>
    )
}

export default Home