import { Navbar, Nav, Container } from 'react-bootstrap'
import { FaSearch, FaUser, FaShoppingCart } from 'react-icons/fa'
import './Navbar.css'

const CustomNavbar = () => {
    return (
        <Navbar bg="light" variant="light" expand="lg" className="shadow-sm py-3">
            {/* shadow-sm para que tenga una sombra suave, py-3 para que tenga un padding vertical*/}
            <Container> {/* Contenedor principal - Centra el contenido, margenes automáticos*/}
                {/* LOGO */}
                <Navbar.Brand href="/">
                    <strong>SHOOTIFY</strong>
                </Navbar.Brand>

                {/* BOTÓN MÓVIL - Se muestra en pantallas pequeñas */}
                <Navbar.Toggle aria-controls="basic-navbar-nav" />

                <Navbar.Collapse id="basic-navbar-nav">

                    {/* MENÚ CENTRADO */}
                    <Nav className="mx-auto"> {/* mx-auto centra el menú */}
                        <Nav.Link className='nav-link' href="#">Productos</Nav.Link>
                        <Nav.Link className='nav-link' href="#">Accesorios</Nav.Link>
                        <Nav.Link className='nav-link' href="#">Novedades</Nav.Link>
                        <Nav.Link className='nav-link' href="#">Ofertas</Nav.Link>
                    </Nav>

                    {/* ICONOS DERECHA */}
                    <div className="d-flex gap-3"> {/* d-flex crea un contenedor flexible, gap-3 crea espacio entre iconos */}
                        <FaSearch className="nav-link-icon" />
                        <FaUser className="nav-link-icon" />
                        <FaShoppingCart className="nav-link-icon" />
                    </div>

                </Navbar.Collapse>

            </Container>

        </Navbar>
    )
}

export default CustomNavbar
