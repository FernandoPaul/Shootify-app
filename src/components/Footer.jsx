import './Footer.css'
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa'
import { NavLink } from 'react-router-dom'

function Footer() {
    return (
        <footer className="footer py-3">
            <div className="container d-flex">
                <div className="row w-100">
                    {/* LOGO */}
                    <div className="col-lg-6 col-md-12 col-sm-12 mb-3">
                        <h3 className='fw-bold'>SHOOTIFY</h3>
                        <p className='fs-6'>Tu tienda de accesorios móviles premium para creadores de contenido</p>
                    </div>
                    {/* TIENDA */}
                    <div className="col-lg-2 col-md-4 col-sm-12 mb-3">
                        <h5>TIENDA</h5>
                        <ul className='list-unstyled fs-6'>
                            <li><NavLink className='nav-link' as={NavLink} to="/catalog/productos">Productos</NavLink></li>
                            <li><NavLink className='nav-link' as={NavLink} to="/catalog/accesorios">Accesorios</NavLink></li>
                            <li><NavLink className='nav-link' as={NavLink} to="/catalog/ofertas">Ofertas</NavLink></li>
                        </ul>
                    </div>
                    {/* INFORMACIÓN */}
                    <div className="col-lg-2 col-md-4 col-sm-12 mb-3">
                        <h5>INFORMACIÓN</h5>
                        <ul className='list-unstyled fs-6'>
                            <li><NavLink className='nav-link' as={NavLink} to="/info/sobre-nosotros">Sobre nosotros</NavLink></li>
                            <li><NavLink className='nav-link' as={NavLink} to="/info/terminos-condiciones">Términos y Condiciones</NavLink></li>
                            <li><NavLink className='nav-link' as={NavLink} to="/contact">Contacto</NavLink></li>
                        </ul>
                    </div>
                    {/* REDES SOCIALES */}
                    <div className="col-lg-2 col-md-4 col-sm-12 mb-3">
                        <h5>REDES SOCIALES</h5>
                        <ul className='list-unstyled fs-6'>
                            {/* Iconos de redes sociales */}
                            <li className='nav-link'><a href="https://www.facebook.com/?locale=es_ES" target="_blank"><FaFacebook style={{ width: '14px', height: '14px' }} /> Facebook</a></li>
                            <li className='nav-link'><a href="https://www.instagram.com/?hl=es" target="_blank"><FaInstagram style={{ width: '14px', height: '14px' }} /> Instagram</a></li>
                            <li className='nav-link'><a href="https://x.com/?lang=es" target="_blank"><FaTwitter style={{ width: '14px', height: '14px' }} /> Twitter</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            {/*ABAJO*/}
            <div className="copy-right">
                <p className='text-center fs-8 mt-4'>© 2026 Shootify - Todos los derechos reservados.</p>
            </div>
        </footer>
    )
}

export default Footer