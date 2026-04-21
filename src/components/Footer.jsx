import './Footer.css'
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa'
import { Link } from 'react-router-dom'

function Footer() {
    return (
        <footer className="footer py-3">
            <div className="container d-flex">
                <div className='row'>
                    {/* IZQUIERDA */}
                    <div className="col-lg-6 mb-4">
                        <h4 className='fw-bold'>SHOOTIFY</h4>
                        <p className='text-muted'>Productos y accesorios para fotografía y vídeo</p>
                    </div>
                    {/* DERECHA */}

                    {/* TIENDA */}
                    <div className="col-lg-2 mb-4">
                        <h6>TIENDA</h6>
                        <ul className='list-unstyled'>
                            <li><Link to="/catalog">Productos</Link></li>
                            <li><Link to="/accesorios">Accesorios</Link></li>
                            <li><Link to="#">Ofertas</Link></li>
                        </ul>
                    </div>
                    {/* CONTACTO */}
                    <div className="col-lg-2 mb-4">
                        <h6>CONTACTO</h6>
                        <ul className='list-unstyled'>
                            <li><a href="#">Correo electrónico</a></li>
                            <li><a href="#">Teléfono</a></li>
                            <li><a href="#">Dirección</a></li>
                        </ul>
                    </div>
                    {/* REDES SOCIALES */}
                    <div className="col-lg-2 mb-4">
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