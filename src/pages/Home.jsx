// src/pages/Home.jsx
import { FiArrowRight } from 'react-icons/fi'

const Home = () => {
    return (
        <section className="hero-section">
            <div className="hero-bg" />
            <div className="container hero-content">
                <p className="hero-tag">📱 Accesorios para creadores</p>
                <h1 className="hero-title">
                    Lleva tu contenido<br />
                    <span className="hero-accent">al siguiente nivel</span>
                </h1>
                <p className="hero-subtitle">
                    Trípodes, estabilizadores, micrófonos y más para iPhone, Samsung y cualquier smartphone.
                </p>
                <button className="btn hero-cta">
                    Ver productos <FiArrowRight />
                </button>
            </div>
        </section>
    )
}

export default Home