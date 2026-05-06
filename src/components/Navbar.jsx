import { useState } from 'react'
import { Navbar, Nav, Container } from 'react-bootstrap'
import { FaSearch, FaUser, FaShoppingCart, FaTimes } from 'react-icons/fa'
import { NavLink, Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'
import './Navbar.css'

const CustomNavbar = () => {
    // Variables mostrar buscador, usuario y carrito
    const [showSearch, setShowSearch] = useState(false)
    const { user } = useAuth()
    const { cartCount } = useCart()
    const [search, setSearch] = useState("")
    const navigate = useNavigate()
    // Variable para controlar el menu colapsable en movil
    const [expanded, setExpanded] = useState(false)
    // Manejador del buscador - Cuando se presiona Enter, se busca en el catálogo
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
            <div className="nav-anuncio bg-dark text-white text-center py-2">
                <span>🎯 Envío gratis en pedidos superiores a 49€ &nbsp;·&nbsp; Devoluciones gratuitas 30 días</span>
            </div>
            <Navbar expanded={expanded} onToggle={() => setExpanded(!expanded)} bg="light" variant="light" expand="lg" sticky='top' className="shadow-sm py-3">
                {/* shadow-sm para que tenga una sombra suave, py-3 para que tenga un padding vertical*/}
                <Container> {/* Contenedor principal - Centra el contenido, margenes automáticos*/}
                    {/* LOGO */}
                    <Navbar.Brand as={Link} to="/">
                        <h1 className='fw-bolder text-black'>SHOOTIFY</h1>
                    </Navbar.Brand>

                    {/* BOTÓN MÓVIL - Se muestra en pantallas pequeñas */}
                    <Navbar.Toggle onClick={() => setExpanded(!expanded)} aria-controls="basic-navbar-nav" />
                    {/* MENU COLLAPSE - Se muestra en pantallas grandes */}
                    <Navbar.Collapse id="basic-navbar-nav">

                        {/* MENÚ CENTRADO */}
                        <Nav className="mx-auto"> {/* mx-auto centra el menú */}
                            <NavLink className='nav-link fw-bold ' as={NavLink} to="/catalog/productos" onClick={() => setExpanded(false)}>Productos</NavLink>
                            <NavLink className='nav-link fw-bold ' as={NavLink} to="/catalog/accesorios" onClick={() => setExpanded(false)}>Accesorios</NavLink>
                            <NavLink className='nav-link fw-bold ' as={NavLink} to="/catalog/destacados" onClick={() => setExpanded(false)}>Destacados</NavLink>
                            <NavLink className='nav-link fw-bold text-danger' as={NavLink} to="/catalog/ofertas" onClick={() => setExpanded(false)}>Ofertas</NavLink>
                        </Nav>

                        {/* ICONOS DERECHA */}
                        <div className="d-flex gap-3"> {/* d-flex crea un contenedor flexible, gap-3 crea espacio entre iconos */}
                            <FaSearch className="nav-link-icon" onClick={() => { setShowSearch(!showSearch); setExpanded(false) }} />
                            <NavLink as={Link} to={user ? "/profile" : "/login"} onClick={() => setExpanded(false)} >
                                <FaUser className="nav-link-icon" />
                            </NavLink>
                            <NavLink as={Link} to="/cart" className="position-relative d-inline-flex" onClick={() => setExpanded(false)}>
                                <FaShoppingCart className="nav-link-icon" />
                                {cartCount > 0 && (
                                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{ fontSize: '0.6rem' }}>
                                        {/* si hay más de 99 productos, muestra 99+, si no, muestra la cantidad de productos */}
                                        {cartCount > 99 ? '99+' : cartCount}
                                    </span>
                                )}
                                {console.log("Numero de productos en el carrito: ", cartCount)}
                            </NavLink>
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
