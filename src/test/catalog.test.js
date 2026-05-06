// src/test/catalog.test.js
import { describe, it, expect } from 'vitest'

// Simulamos el array de productos tal como viene de Firestore
const productos = [
    { id: '1', name: 'Trípode Flexible Pro', type: 'productos', category: 'Trípodes', onSale: false, featured: true },
    { id: '2', name: 'DJI Osmo Mobile 7', type: 'productos', category: 'Estabilizadores', onSale: true, featured: true },
    { id: '3', name: 'Cable USB-C 2m', type: 'accesorios', category: 'Cables', onSale: false, featured: false },
    { id: '4', name: 'Carcasa MagSafe', type: 'accesorios', category: 'Carcasas', onSale: true, featured: false },
]

// Replica exacta de la lógica en Catalog.jsx
const normalizarTexto = (texto) =>
    texto?.toLowerCase()?.normalize('NFD')?.replace(/[\u0300-\u036f]/g, '')

function filtrar(products, { type, category = 'Todos', search = '' }) {
    return products.filter((product) => {
        let elegirTipo = true
        if (type === 'destacados') elegirTipo = product.featured === true
        else if (type === 'ofertas') elegirTipo = product.onSale === true
        else if (type && type !== 'Todos') elegirTipo = product.type?.toLowerCase() === type?.toLowerCase()

        const elegirCategoria = category === 'Todos' || product.category?.toLowerCase() === category?.toLowerCase()
        const elegirBusqueda = !search || normalizarTexto(product.name).includes(normalizarTexto(search))

        return elegirTipo && elegirCategoria && elegirBusqueda
    })
}

describe('Filtro del catálogo', () => {
    it('filtra por type=productos', () => {
        const result = filtrar(productos, { type: 'productos' })
        expect(result).toHaveLength(2)
        expect(result.every(p => p.type === 'productos')).toBe(true)
    })

    it('filtra por ofertas (onSale=true)', () => {
        const result = filtrar(productos, { type: 'ofertas' })
        expect(result).toHaveLength(2)
        expect(result.every(p => p.onSale)).toBe(true)
    })

    it('filtra por destacados (featured=true)', () => {
        const result = filtrar(productos, { type: 'destacados' })
        expect(result).toHaveLength(2)
    })

    it('filtra por categoría Trípodes', () => {
        const result = filtrar(productos, { type: 'productos', category: 'Trípodes' })
        expect(result).toHaveLength(1)
        expect(result[0].name).toBe('Trípode Flexible Pro')
    })

    it('busca sin acento y encuentra con acento', () => {
        const result = filtrar(productos, { type: undefined, search: 'tripode' })
        expect(result).toHaveLength(1)
        expect(result[0].id).toBe('1')
    })

    it('devuelve array vacío si no hay resultados', () => {
        const result = filtrar(productos, { type: undefined, search: 'xxxxxxxxxx' })
        expect(result).toHaveLength(0)
    })

    it('combina tipo + categoría correctamente', () => {
        const result = filtrar(productos, { type: 'accesorios', category: 'Cables' })
        expect(result).toHaveLength(1)
        expect(result[0].name).toBe('Cable USB-C 2m')
    })
})