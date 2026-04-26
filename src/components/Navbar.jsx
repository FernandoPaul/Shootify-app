import { useState } from 'react'
import { Navbar, Nav, Container } from 'react-bootstrap'
import { FaSearch, FaUser, FaShoppingCart, FaTimes } from 'react-icons/fa'
import { NavLink, Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import './Navbar.css'

const CustomNavbar = () => {
    const [showSearch, setShowSearch] = useState(false)
    const { user } = useAuth()
    const [search, setSearch] = useState("")
    const navigate = useNavigate()

    const handleSearch = (e) => {
        if (e.key === "Enter") {
            e.preventDefault() /* Evita que la página se recargue */
            if (search.trim() !== "") { /* Evita que la búsqueda se realice sin texto */
                navigate(`/catalog?search=${search}`)
                setShowSearch(false) /* Cierra la barra de búsqueda */
                setSearch("") /* Limpia la barra de búsqueda */
            }
        }
    }

    return (
        <>
            <div className="nav-anuncio">
                <span>🎯 Envío gratis en pedidos superiores a 49€ &nbsp;·&nbsp; Devoluciones gratuitas 30 días</span>
            </div>

            <Navbar bg="light" variant="light" expand="lg" sticky='top' className="shadow-sm py-3">
                {/* shadow-sm para que tenga una sombra suave, py-3 para que tenga un padding vertical*/}
                <Container> {/* Contenedor principal - Centra el contenido, margenes automáticos*/}
                    {/* LOGO */}
                    <Navbar.Brand as={Link} to="/">
                        <strong>SHOOTIFY</strong>
                    </Navbar.Brand>

                    {/* BOTÓN MÓVIL - Se muestra en pantallas pequeñas */}
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />

                    <Navbar.Collapse id="basic-navbar-nav">

                        {/* MENÚ CENTRADO */}
                        <Nav className="mx-auto"> {/* mx-auto centra el menú */}
                            <Nav.Link className='nav-link' as={NavLink} to="/catalog/productos">Productos</Nav.Link>
                            <Nav.Link className='nav-link' as={NavLink} to="/catalog/accesorios">Accesorios</Nav.Link>
                            <Nav.Link className='nav-link' as={NavLink} to="/catalog/novedades">Destacados</Nav.Link>
                            <Nav.Link className='nav-link' as={NavLink} to="/catalog/ofertas" style={{ color: 'rgba(254, 30, 30, 1)' }}>Ofertas</Nav.Link>
                        </Nav>

                        {/* ICONOS DERECHA */}
                        <div className="d-flex gap-3"> {/* d-flex crea un contenedor flexible, gap-3 crea espacio entre iconos */}
                            <FaSearch className="nav-link-icon" onClick={() => setShowSearch(!showSearch)} />
                            <Nav.Link as={Link} to={user ? "/profile" : "/login"}>
                                <FaUser className="nav-link-icon" />
                            </Nav.Link>
                            <Nav.Link as={Link} to="/cart">
                                <FaShoppingCart className="nav-link-icon" />
                            </Nav.Link>
                        </div>

                    </Navbar.Collapse>
                </Container>
            </Navbar>
            {/* BARRA DE BÚSQUEDA - Se muestra cuando se hace clic en el icono de búsqueda */}
            {showSearch && (
                <div className="search-bar">
                    <div className="container d-flex align-items-center">
                        <FaSearch className="search-icon me-2 text-muted" />
                        <input type="text"
                            className="form-control border-0"
                            placeholder="Buscar en el catálogo..."
                            autoFocus
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            onKeyDown={handleSearch}
                        />
                        <FaTimes className="ms-2" onClick={() => setShowSearch(false)} /> {/* Icono de cerrar - Se muestra cuando se hace clic en el icono de búsqueda*/}
                    </div>
                </div>
            )}
        </>
    )
}

export default CustomNavbar
