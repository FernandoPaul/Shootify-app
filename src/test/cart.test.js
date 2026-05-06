// src/test/cart.test.js
import { describe, it, expect } from 'vitest'

// Lógica extraída de CartContext para probarla de forma aislada
function addToCart(cart, product, quantity = 1) {
    const exists = cart.find(item => item.id === product.id)
    if (exists) {
        return cart.map(item =>
            item.id === product.id
                ? { ...item, quantity: item.quantity + quantity }
                : item
        )
    }
    return [...cart, { ...product, quantity }]
}

function removeFromCart(cart, productId) {
    return cart.filter(item => item.id !== productId)
}

function updateQuantity(cart, productId, quantity) {
    if (quantity < 1) return cart
    return cart.map(item =>
        item.id === productId ? { ...item, quantity } : item
    )
}

const cartTotal = (cart) => cart.reduce((acc, item) => acc + item.price * item.quantity, 0)
const cartCount = (cart) => cart.reduce((acc, item) => acc + item.quantity, 0)

const producto = { id: 'P1', name: 'Trípode', price: 29.99 }

describe('Carrito — operaciones básicas', () => {
    it('añade un producto nuevo al carrito', () => {
        const cart = addToCart([], producto, 1)
        expect(cart).toHaveLength(1)
        expect(cart[0].quantity).toBe(1)
    })

    it('suma cantidad si el producto ya existe', () => {
        const cart = addToCart([{ ...producto, quantity: 1 }], producto, 2)
        expect(cart).toHaveLength(1)
        expect(cart[0].quantity).toBe(3)
    })

    it('elimina un producto del carrito', () => {
        const cart = removeFromCart([{ ...producto, quantity: 1 }], 'P1')
        expect(cart).toHaveLength(0)
    })

    it('actualiza la cantidad de un producto', () => {
        const cart = updateQuantity([{ ...producto, quantity: 1 }], 'P1', 5)
        expect(cart[0].quantity).toBe(5)
    })

    it('no permite cantidad menor que 1', () => {
        const cartInicial = [{ ...producto, quantity: 2 }]
        const cart = updateQuantity(cartInicial, 'P1', 0)
        expect(cart[0].quantity).toBe(2) // no cambia
    })

    it('calcula el total correctamente', () => {
        const cart = [{ ...producto, quantity: 3 }]
        expect(cartTotal(cart)).toBeCloseTo(89.97)
    })

    it('calcula el número total de items', () => {
        const cart = [
            { ...producto, quantity: 2 },
            { id: 'P2', name: 'Mic', price: 99, quantity: 1 }
        ]
        expect(cartCount(cart)).toBe(3)
    })

    it('carrito vacío devuelve total 0', () => {
        expect(cartTotal([])).toBe(0)
        expect(cartCount([])).toBe(0)
    })
})