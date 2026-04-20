import CustomNavbar from './components/Navbar'
import Hero from './components/Hero'
import Products from './pages/Products'
import ProductDetail from './pages/ProductDetail'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import NewsletterBanner from './components/NewsletterBanner'
import Footer from './components/Footer'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'
import { AuthProvider } from './context/AuthContext'
import Cart from './pages/Cart'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <CustomNavbar />
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
        <NewsletterBanner />
        <Footer />
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
