import "./Hero.css";
import HeroImg from "../assets/Gemini_Generated_Hero.png";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const Hero = ({ CatalogRef }) => {
    const handleScrollToCatalog = () => {
        CatalogRef.current?.scrollIntoView({ behavior: "smooth" });
    };
    return (
        <section className="hero-section d-flex justify-content-center align-items-center">
            {/* d-flex para que sea flexbox, align-items-center para centrar verticalmente */}
            <Container className="hero-container py-5">
                <div className="row align-items-center"> {/* align-items-center para centrar verticalmente */}
                    {/* Texto izquierda */}
                    <div className="hero-left col-lg-6 col-md-6 col-sm-12"> {/* col-lg-6 para que ocupe la mitad de la pantalla en pantallas grandes */}
                        <span className="badge bg-black text-white mb-3">NUEVO 2026</span>
                        <h1 className="hero-title">
                            ELEVA TU <br />
                            <span>CONTENIDO</span> <br />
                            MÓVIL</h1>
                        <p className="hero-descripcion text-muted mb-4"> {/* text-muted para que el texto sea gris */}
                            Accesorios profesionales para iPhone, Samsung y más.
                            Tripodes, micrófonos, Magsafe y todo lo que necesitas.
                        </p>
                        <div className="hero-buttons d-flex gap-3 mb-4">
                            {/* d-flex para que sea flexbox, gap-3 para que haya espacio entre los botones */}
                            <button className="btn btn-dark" onClick={handleScrollToCatalog}>Ver Catálogo</button>
                            <Link to="/catalog" className="btn btn-dark">Ver Novedades</Link>
                        </div>
                        <div className="hero-stats d-flex gap-4">
                            {/* tex-muted para que el texto sea gris */}
                            <div><strong>100+</strong><small className="text-muted">Productos</small></div>
                            <div><strong>4.9 ★</strong><small className="text-muted">Valoración media</small></div>
                            <div><strong>48h</strong><small className="text-muted">Envío express</small></div>
                        </div>
                    </div>
                    {/* Imagen derecha */}
                    <div className="col-lg-6 col-md-6  text-center ">
                        <div className="img-hero mx-auto">
                            <img src={HeroImg} alt="hero prueba" className="img-fluid" />
                            {/*img-fluid para que la imagen se adapte al contenedor*/}
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    )
}

export default Hero