import { createContext, useContext, useState, useEffect } from 'react'
import { useAuth } from './AuthContext'
import { db } from '../firebase/config'
import { doc, getDoc, setDoc } from 'firebase/firestore'

// NUEVO: Provider que se conecta con Firebase para guardar y cargar el carrito
const CartContext = createContext()
const LOCAL_STORAGE_CART_KEY = 'Shootify_cart'

export function CartProvider({ children }) {
    const [cart, setCart] = useState([])
    const { user } = useAuth()

    // Cargar carrito según si hay usuario o no
    useEffect(() => {
        if (user) {
            mergeAndLoadCart(user.uid)
        } else {
            loadLocalCart()
        }
    }, [user]) // Se ejecuta cuando el carrito o el usuario cambian

    // LOCAL STORAGE
    const loadLocalCart = () => {
        try {
            const stored = localStorage.getItem(LOCAL_STORAGE_CART_KEY)
            setCart(stored ? JSON.parse(stored) : [])
        } catch {
            setCart([])
        }
    }
    const saveLocalCart = (items) => {
        localStorage.setItem(LOCAL_STORAGE_CART_KEY, JSON.stringify(items))
    }

    const clearLocalCart = () => {
        localStorage.removeItem(LOCAL_STORAGE_CART_KEY)
    }

    // CARGAR carrito desde FIRESTORE 
    const loadFirestoreCart = async (uid) => {
        try {
            const ref = doc(db, 'carts', uid)
            const snap = await getDoc(ref)
            // si existe devuelve el carrito, si no, devuelve un carrito vacío
            return snap.exists() ? snap.data().items || [] : []
        } catch (error) {
            console.error('Error cargando carrito:', error)
        }
    }

    // GUARDAR carrito en Firestore
    const saveFirestoreCart = async (items) => {
        // Si no hay usuario, no se puede guardar el carrito
        if (!user) return
        try {
            // referencia del documento
            const ref = doc(db, 'carts', user.uid)
            // guardamos el carrito
            await setDoc(ref, { items })
        } catch (error) {
            console.error('Error guardando carrito:', error)
        }
    }

    // --- FUSIONAR Y CARGAR: cuando el usuario inicia sesión fusiona ambos carritos ---
    const mergeAndLoadCart = async (uid) => {
        // Carga el carrito de Firestore
        const firestoreCart = await loadFirestoreCart(uid)
        // Carga el carrito de localStorage
        const localCart = JSON.parse(localStorage.getItem(LOCAL_STORAGE_CART_KEY) || '[]')

        if (localCart.length === 0) {
            // No hay carrito local, carga solo el de Firestore
            setCart(firestoreCart)
            return
        }

        // Fusiona: si el producto ya está en Firestore, suma cantidades
        const merged = [...firestoreCart]
        localCart.forEach(localItem => {
            const exists = merged.find(item => item.id === localItem.id)
            if (exists) {
                exists.quantity += localItem.quantity
            } else {
                merged.push(localItem)
            }
        })

        setCart(merged)
        await saveFirestoreCart(merged)
        clearLocalCart() // limpia el localStorage tras fusionar
    }
    // ACCIONES QUE REALIZAN LOS USUARIOS
    // Añadir producto al carrito
    const addToCart = async (product, quantity = 1) => {
        const exists = cart.find(item => item.id === product.id)
        let newCart
        if (exists) {
            // Si ya existe, suma la cantidad
            newCart = cart.map(item =>
                item.id === product.id
                    ? { ...item, quantity: item.quantity + quantity }
                    : item
            )
        } else {
            // Si no existe, añade el producto
            newCart = [...cart, {
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image[0],
                brand: product.brand,
                quantity
            }]
        }

        setCart(newCart)
        // si hay usuario, guardamos en firestore, si no, en local
        if (user) {
            await saveFirestoreCart(newCart)
        } else {
            saveLocalCart(newCart)
        }
    }

    // Eliminar producto del carrito
    const removeFromCart = async (productId) => {
        const newCart = cart.filter(item => item.id !== productId)
        setCart(newCart)
        // si hay usuario, guardamos en firestore, si no, en local
        if (user) {
            await saveFirestoreCart(newCart)
        } else {
            saveLocalCart(newCart)
        }
    }

    // Cambiar cantidad de un producto
    const updateQuantity = async (productId, quantity) => {
        // si la cantidad es menor a 1, no se puede actualizar
        if (quantity < 1) return
        const newCart = cart.map(item =>
            item.id === productId ? { ...item, quantity } : item
        )
        setCart(newCart)
        // si hay usuario, guardamos en firestore, si no, en local
        if (user) {
            await saveFirestoreCart(newCart)
        } else {
            saveLocalCart(newCart)
        }
    }

    // Vaciar carrito
    const clearCart = async () => {
        setCart([])
        // si hay usuario, guardamos en firestore, si no, en local
        if (user) {
            await saveFirestoreCart()
        } else {
            saveLocalCart()
        }
    }

    // Total de items en el carrito
    const cartCount = cart.reduce((acumulador, item) => acumulador + item.quantity, 0)
    // Precio total
    const cartTotal = cart.reduce((acumulador, item) => acumulador + item.price * item.quantity, 0)

    return (
        <CartContext.Provider value={{
            cart, cartCount, cartTotal,
            addToCart, removeFromCart, updateQuantity, clearCart
        }}>
            {children}
        </CartContext.Provider>
    )
}

export const useCart = () => useContext(CartContext)