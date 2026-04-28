import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
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

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <CustomNavbar />
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
    </AuthProvider>
  )
}

export default App
