import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { CartProvider } from './context/CartContext'
import NewsletterBanner from './components/NewsletterBanner'
import Footer from './components/Footer'
import CustomNavbar from './components/Navbar'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'
import Cart from './pages/Cart'
import Contact from './pages/Contact'
import Catalog from './pages/Catalog'
import CompanyInfo from './pages/CompanyInfo'
import ProductDetail from './pages/ProductDetail'
import ScrollToTop from './components/ScrollToTop'

function App() {
  return (
    // AuthProvider proporciona el usuario logueado y la función de login/logout a toda la aplicación
    <AuthProvider>
      {/* CartProvider proporciona el carrito y las funciones de agregar/eliminar/actualizar productos a toda la aplicación */}
      <CartProvider>
        {/* BrowserRouter permite el enrutamiento entre páginas sin recargar la página */}
        <BrowserRouter>
          {/* Esto hace que la página se desplace hacia arriba cuando cambia la ruta */}
          <ScrollToTop />
          {/* Navbar - Barra de navegación con enlaces a las diferentes secciones de la página */}
          <CustomNavbar />
          {/* Routes - Define las rutas de la aplicación*/}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/catalog/:type" element={<Catalog />} />
            <Route path="/catalog/item/:id" element={<ProductDetail />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/cart" element={<Cart />} />
            <Route path='/info/:slug' element={<CompanyInfo />}></Route>
            <Route path='/contact' element={<Contact />}></Route>
          </Routes>
          <NewsletterBanner />
          <Footer />
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  )
}

export default App
