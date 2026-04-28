import './Footer.css'
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa'
import { NavLink } from 'react-router-dom'

function Footer() {
    return (
        <footer className="footer py-3">
            <div className="container d-flex">
                <div className="row w-100">
                    {/* IZQUIERDA */}
                    <div class="col-lg-6 col-md-12 col-sm-12 mb-3">
                        <h4 className='fw-bold'>SHOOTIFY</h4>
                        <p className='text-muted'>Productos y accesorios para fotografía y vídeo</p>
                    </div>
                    {/* DERECHA */}

                    {/* TIENDA */}
                    <div class="col-lg-2 col-md-4 col-sm-12 mb-3">
                        <h6>TIENDA</h6>
                        <ul className='list-unstyled'>
                            <li><NavLink className='nav-link' as={NavLink} to="/catalog/productos">Productos</NavLink></li>
                            <li><NavLink className='nav-link' as={NavLink} to="/catalog/accesorios">Accesorios</NavLink></li>
                            <li><NavLink className='nav-link' as={NavLink} to="/catalog/ofertas">Ofertas</NavLink></li>
                        </ul>
                    </div>
                    {/* INFORMACIÓN */}
                    <div className="col-lg-2 col-md-4 col-sm-12 mb-3">
                        <h6>INFORMACIÓN</h6>
                        <ul className='list-unstyled'>
                            <li><NavLink className='nav-link' as={NavLink} to="/info/sobre-nosotros">Sobre nosotros</NavLink></li>
                            <li><NavLink className='nav-link' as={NavLink} to="/info/terminos-condiciones">Términos y Condiciones</NavLink></li>
                            <li><NavLink className='nav-link' as={NavLink} to="/contact">Contacto</NavLink></li>
                        </ul>
                    </div>
                    {/* REDES SOCIALES */}
                    <div className="col-lg-2 col-md-4 col-sm-12 mb-3">
                        <h6>REDES SOCIALES</h6>
                        <ul className='list-unstyled'>
                            {/* Iconos de redes sociales */}
                            <li><a href="https://www.facebook.com/?locale=es_ES" target="_blank"><FaFacebook style={{ width: '14px', height: '14px' }} /> Facebook</a></li>
                            <li><a href="https://www.instagram.com/?hl=es" target="_blank"><FaInstagram style={{ width: '14px', height: '14px' }} /> Instagram</a></li>
                            <li><a href="https://x.com/?lang=es" target="_blank"><FaTwitter style={{ width: '14px', height: '14px' }} /> Twitter</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            {/*ABAJO*/}
            <div className="copy-right">
                <p className='text-muted mt-4'>© 2026 Shootify - Todos los derechos reservados.</p>
            </div>
        </footer>
    )
}

export default Footer